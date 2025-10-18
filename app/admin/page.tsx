'use client';

import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import GridBackground from '@/components/ui/grid-background';
import { LogOut, Eye, EyeOff, Mail } from 'lucide-react';
import CryptoJS from 'crypto-js';
import Link from 'next/link';

interface Purchase {
  invoiceId: string;
  userName: string;
  userEmail: string;
  courseName: string;
  purchaseDate: string;
  amount: string;
  phone?: string;
}

// Hardcoded credentials (NOT RECOMMENDED FOR PRODUCTION)
const ADMIN_USERNAME_CLIENT = "ronok";
const ADMIN_PASSWORD_CLIENT = "ronok111";

// !!! SECURITY WARNING: Hardcoding keys is NOT recommended for production. !!!
const HARDCODED_ENCRYPTION_KEY = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2";
const encryptionKeyHex = CryptoJS.enc.Hex.parse(HARDCODED_ENCRYPTION_KEY);

// Decryption function using CryptoJS AES-CBC
function decrypt(encryptedTextWithIv: string, key: CryptoJS.lib.WordArray): Purchase[] | null {
  try {
    const parts = encryptedTextWithIv.split(':');
    if (parts.length !== 2) {
      console.error('Invalid encrypted data format (expected iv:ciphertext).');
      return null;
    }
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encryptedPayload = parts[1];

    console.log('Client Decrypt - Key (Hex)', CryptoJS.enc.Hex.stringify(key));
    console.log('Client Decrypt - IV (Hex)', CryptoJS.enc.Hex.stringify(iv));
    console.log('Client Decrypt - Ciphertext (Hex)', encryptedPayload);

    const ciphertextAsWordArray = CryptoJS.enc.Hex.parse(encryptedPayload);

    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext: ciphertextAsWordArray }),
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
        console.error('Decryption resulted in empty string. Check key, IV, or padding.');
        return null;
    }
    return JSON.parse(decryptedText) as Purchase[];
  } catch (error) {
    console.error('Decryption failed:', error);
    // Log more details if possible, e.g., if it's a padding error
    if ((error as Error).message.toLowerCase().includes('malformed utf-8 data')) {
        console.error('Decryption error likely due to incorrect key or IV, or data corruption, leading to malformed UTF-8 output.');
    } else if ((error as Error).message.toLowerCase().includes('padding')) {
        console.error('Decryption error likely due to incorrect PKCS7 padding. Check if the ciphertext was altered or if the padding scheme matches encryption.');
    }
    return null;
  }
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast: showToast } = useToast();

  // No initial auth check needed as state is purely client-side now
  // useEffect(() => { ... }); 

  useEffect(() => {
    if (isLoggedIn) {
      fetchPurchases();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    // Client-side credential check (simplified, matches backend)
    if (username === ADMIN_USERNAME_CLIENT && password === ADMIN_PASSWORD_CLIENT) {
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        showToast({ title: 'Login Successful', description: 'Welcome, Admin!' });
    } else {
      const msg = 'Invalid username or password';
      setError(msg);
      showToast({ title: 'Login Failed', description: msg, variant: 'destructive' });
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setPurchases([]);
    showToast({ title: 'Logout Successful' });
    // No API call needed for logout with client-side state
  };

  const fetchPurchases = async () => {
    try {
      const response = await axios.get<{ success: boolean, encryptedData?: string, message?: string, purchases?: Purchase[] }>('/api/admin/purchases');
      
      if (response.data.success && response.data.encryptedData) {
        const decryptedPurchases = decrypt(response.data.encryptedData, encryptionKeyHex);
        if (decryptedPurchases) {
          const sortedPurchases = decryptedPurchases.sort((a, b) => 
            new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
          );
          setPurchases(sortedPurchases);
        } else {
          setError('Failed to decrypt purchase data.');
          showToast({ title: 'Decryption Error', description: 'Could not decrypt purchase data.', variant: 'destructive' });
          setPurchases([]); // Clear purchases on decryption error
        }
      } else if (response.data.success && response.data.purchases) {
        // Fallback for unencrypted data, or if API sends empty purchases directly
        const sortedPurchases = response.data.purchases.sort((a, b) => 
            new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
          );
        setPurchases(sortedPurchases);
        if (response.data.purchases.length === 0) {
             showToast({ title: 'No Purchases', description: 'No purchases found yet.'});
        }
      } else {
        setError(response.data.message || 'Failed to fetch purchases.');
        showToast({ title: 'Error Fetching Purchases', description: response.data.message || 'Could not load data.', variant: 'destructive' });
      }
    } catch (err: any) {
      setError('Failed to fetch purchases. Ensure Redis is connected and the API route is working.');
      showToast({ title: 'Error Fetching Purchases', description: err.response?.data?.message || 'Could not load data.', variant: 'destructive' });
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      });
    } catch {
      return dateString;
    }
  };

  // isLoading state removed as initial auth check is removed.

  if (!isLoggedIn) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-background py-12">
        <GridBackground />
        <div className="container relative z-10 mx-auto flex max-w-md flex-col items-center">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="font-hind-siliguri text-2xl">এডমিন লগইন</CardTitle>
              <CardDescription>আপনার এডমিন প্যানেলে স্বাগতম</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">ইউজারনেম</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    // placeholder={ADMIN_USERNAME_CLIENT} // Removed placeholder for security
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">পাসওয়ার্ড</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      // placeholder={ADMIN_PASSWORD_CLIENT} // Removed placeholder for security
                    />
                    <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full bg-[#5D28E0] hover:bg-[#4A20B5]">লগইন করুন</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-background py-8 md:py-12">
      <GridBackground />
      <div className="container relative z-10 mx-auto max-w-6xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-hind-siliguri text-2xl">এডমিন ড্যাশবোর্ড</CardTitle>
              <CardDescription>কোর্স পারচেজ দেখুন এবং পরিচালনা করুন</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/admin/send-email" passHref>
                <Button variant="outline" size="sm" asChild>
                  <a className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    রিমাইন্ডার ইমেইল
                  </a>
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                লগআউট
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {purchases.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ইনভয়েস আইডি</TableHead>
                    <TableHead>ব্যবহারকারীর নাম</TableHead>
                    <TableHead>ইমেইল</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>কোর্সের নাম</TableHead>
                    <TableHead>টাকা</TableHead>
                    <TableHead>ক্রয়ের তারিখ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.invoiceId}>
                      <TableCell className="font-medium">{purchase.invoiceId}</TableCell>
                      <TableCell>{purchase.userName}</TableCell>
                      <TableCell>{purchase.userEmail}</TableCell>
                      <TableCell>{purchase.phone || '-'}</TableCell>
                      <TableCell>{purchase.courseName}</TableCell>
                      <TableCell>{purchase.amount}</TableCell>
                      <TableCell>{formatDate(purchase.purchaseDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="py-10 text-center text-muted-foreground">এখনো পর্যন্ত কোন পারচেজ নেই।</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 
