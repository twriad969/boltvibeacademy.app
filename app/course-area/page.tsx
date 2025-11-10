'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import 'plyr-react/plyr.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import GridBackground from '@/components/ui/grid-background';
import { Menu, X, Youtube, Play, BookOpen, CheckCircle, Lock, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getLessons, Lesson } from '@/lib/courses';

const SUPABASE_CHECK_EMAIL_FUNCTION_URL = "https://ojpbxfeerhcrcmhmktab.supabase.co/functions/v1/emails/check";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcGJ4ZmVlcmhjcmNtaG1rdGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQxNzcsImV4cCI6MjA3MDg1MDE3N30.APuEvGxTNKWhWniDoAGFHT-cMyl5PxW41JwGt6pMius";

const Plyr = dynamic(() => import('plyr-react'), { ssr: false });

function VideoPlayer({ url }: { url: string }) {
  const videoSrc = {
    type: 'video' as const,
    sources: [
      {
        src: url,
      },
    ],
  };

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <Plyr source={videoSrc} />
    </div>
  );
}

function LessonContent({ lesson, currentIndex, totalLessons, onPrevious, onNext }: { 
  lesson: Lesson | null;
  currentIndex: number;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  if (!lesson) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="font-hind-siliguri text-muted-foreground">একটি লেসন নির্বাচন করুন</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{lesson.module}</span>
          {lesson.duration && (
            <>
              <span>•</span>
              <span>{lesson.duration}</span>
            </>
          )}
        </div>
        <h1 className="font-hind-siliguri text-xl font-bold md:text-2xl">
          {lesson.title}
        </h1>
      </div>

      {/* Video Content */}
      {lesson.videoIframe ? (
        <div className="aspect-video w-full overflow-hidden rounded-lg" 
             dangerouslySetInnerHTML={{ __html: lesson.videoIframe }} />
      ) : (
        <div className="aspect-video w-full rounded-lg bg-red-50 border border-red-300 flex flex-col items-center justify-center p-6">
          <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
          <p className="font-hind-siliguri text-red-600 text-lg font-bold text-center mb-2">
            ভিডিও আপলোড হচ্ছে
          </p>
          <p className="font-hind-siliguri text-red-600 text-center">
            অনুগ্রহ করে অপেক্ষা করুন
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="font-hind-siliguri"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          পূর্ববর্তী
        </Button>
        
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {totalLessons}
        </span>
        
        <Button
          variant="outline"
          onClick={onNext}
          disabled={currentIndex === totalLessons - 1}
          className="font-hind-siliguri"
        >
          পরবর্তী
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Lesson Description */}
      {lesson.description ? (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-hind-siliguri mb-2 font-semibold">লেসনের বিবরণ</h3>
          <p className="font-hind-siliguri text-muted-foreground">
            {lesson.description}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-4">
                      <p className="font-hind-siliguri text-muted-foreground">
              ভিডিও শীঘ্রই আপলোড করা হবে। বিস্তারিত তথ্যের জন্য অনুগ্রহ করে অপেক্ষা করুন।
            </p>
        </div>
      )}
    </div>
  );
}

function LessonSidebar({ 
  lessons, 
  selectedLessonId, 
  onLessonSelect, 
  isOpen, 
  onClose 
}: {
  lessons: Lesson[];
  selectedLessonId: number | null;
  onLessonSelect: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Initialize all modules as expanded by default
  useEffect(() => {
    const modules = new Set(
      Object.keys(
        lessons.reduce((acc, lesson) => {
          acc[lesson.module] = true;
          return acc;
        }, {} as Record<string, boolean>)
      )
    );
    setExpandedModules(modules);
  }, [lessons]);

  const toggleModule = (moduleName: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleName)) {
        next.delete(moduleName);
      } else {
        next.add(moduleName);
      }
      return next;
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 transform bg-background border-r transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-hind-siliguri text-lg font-semibold">কোর্স মডিউল</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Notice */}
          <div className="bg-blue-50 border-b border-blue-200 p-3 space-y-2">
            <p className="font-hind-siliguri text-blue-600 text-sm text-center">
              নতুন আপডেট আসছে
            </p>
            <p className="font-hind-siliguri text-blue-600 text-sm text-center">
              লেসন দেখতে সমস্যা হলে VPN ব্যবহার করুন। আপনার ইন্টারনেট সার্ভিস প্রোভাইডার কোর্স সার্ভার ব্লক করে দিতে পারে।
            </p>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {Object.entries(
                lessons.reduce((acc, lesson) => {
                  if (!acc[lesson.module]) {
                    acc[lesson.module] = [];
                  }
                  acc[lesson.module].push(lesson);
                  return acc;
                }, {} as Record<string, Lesson[]>)
              ).map(([moduleName, moduleLessons]) => {
                const isExpanded = expandedModules.has(moduleName);
                return (
                  <div key={moduleName}>
                    <button
                      onClick={() => toggleModule(moduleName)}
                      className="font-hind-siliguri w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <span>{moduleName}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="ml-2">
                        {moduleLessons.map((lesson, index) => (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              onLessonSelect(lesson.id);
                              onClose();
                            }}
                            className={cn(
                              "w-full rounded-lg p-3 text-left transition-colors hover:bg-accent",
                              selectedLessonId === lesson.id && "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium",
                                selectedLessonId === lesson.id 
                                  ? "border-primary-foreground/20 bg-primary-foreground/10" 
                                  : "border-border bg-muted"
                              )}>
                                {lessons.findIndex(l => l.id === lesson.id) + 1}
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="font-hind-siliguri text-sm font-medium leading-snug">
                                  {lesson.shortTitle || lesson.title}
                                </p>
                                {lesson.duration && (
                                  <p className={cn(
                                    "text-xs",
                                    selectedLessonId === lesson.id 
                                      ? "text-primary-foreground/70" 
                                      : "text-muted-foreground"
                                  )}>
                                    {lesson.duration}
                                  </p>
                                )}
                              </div>
                              {selectedLessonId === lesson.id && (
                                <CheckCircle className="mt-0.5 h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CourseAreaPage() {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1); // First lesson has the iframe
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);
  const { toast } = useToast();

  // Fetch lessons from API
  useEffect(() => {
    const fetchLessonsData = async () => {
      try {
        setIsLoadingLessons(true);
        const lessonsData = await getLessons();
        setLessons(lessonsData);
        
        // Set first lesson as selected if lessons are available
        if (lessonsData.length > 0) {
          setSelectedLessonId(lessonsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast({
          title: 'ত্রুটি',
          description: 'লেসন লোড করতে সমস্যা হয়েছে। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingLessons(false);
      }
    };

    fetchLessonsData();
  }, []);

  useEffect(() => {
    const session = localStorage.getItem('course-session');
    if (session) {
      const { email: storedEmail, expires } = JSON.parse(session);
      if (new Date().getTime() < expires) {
        setEmail(storedEmail);
        setIsVerified(true);
      } else {
        localStorage.removeItem('course-session');
      }
    }
    
    const paymentSuccessState = localStorage.getItem('paymentSuccess');
    if (paymentSuccessState) {
      try {
        const { email: paidEmail, expires: paidExpires } = JSON.parse(paymentSuccessState);
        if (new Date().getTime() < paidExpires) {
          setEmail(paidEmail);
          setIsVerified(true);
          toast({
            title: 'স্বাগতম!',
            description: 'আপনার পূর্ববর্তী পেমেন্ট সফল হয়েছে।',
          });
        } else {
          localStorage.removeItem('paymentSuccess'); // Expired
        }
      } catch (e) {
        console.error('Error parsing paymentSuccess from localStorage:', e);
        localStorage.removeItem('paymentSuccess');
      }
    }
    setIsCheckingAuth(false);
  }, []);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SUPABASE_CHECK_EMAIL_FUNCTION_URL}?email=${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success && data.data && data.data.exists) {
        setIsVerified(true);
        const expires = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
        localStorage.setItem('course-session', JSON.stringify({ email, expires }));
        toast({
          title: 'অ্যাক্সেস অনুমোদিত',
          description: 'কোর্স এরিয়ায় স্বাগতম!',
        });
      } else {
        setError(data.message || 'আপনার ইমেইলটি ভেরিফাই করা সম্ভব হয়নি।');
      }
    } catch (err) {
      setError('একটি ইরর হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedLesson = lessons.find(l => l.id === selectedLessonId) || null;
  const currentIndex = lessons.findIndex(l => l.id === selectedLessonId);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedLessonId(lessons[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      setSelectedLessonId(lessons[currentIndex + 1].id);
    }
  };

  if (isCheckingAuth || isLoadingLessons) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-hind-siliguri text-muted-foreground">
            {isCheckingAuth ? 'Loading...' : 'লেসন লোড হচ্ছে...'}
          </p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <GridBackground />
        <div className="container relative z-10 flex min-h-screen items-center justify-center px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-hind-siliguri text-2xl">কোর্স এরিয়া</CardTitle>
              <CardDescription className="font-hind-siliguri">
                কোর্স অ্যাক্সেস করতে আপনার রেজিস্টার করা ইমেইল দিন
              </CardDescription>

            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-hind-siliguri text-sm font-medium">
                    ইমেইল অ্যাড্রেস
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@email.com"
                    className="h-11"
                  />
                </div>
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3">
                    <p className="font-hind-siliguri text-sm text-destructive">{error}</p>
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="font-hind-siliguri h-11 w-full bg-primary hover:bg-primary/90" 
                  disabled={isLoading}
                >
                  {isLoading ? 'ভেরিফাই করা হচ্ছে...' : 'কোর্সে প্রবেশ করুন'}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/" passHref>
                  <Button variant="link" className="font-hind-siliguri text-primary">
                    হোম পেজে ফিরে যান
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <LessonSidebar
        lessons={lessons}
        selectedLessonId={selectedLessonId}
        onLessonSelect={setSelectedLessonId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-background px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                <span className="font-semibold">VibeTech LMS</span>
              </div>
            </div>
            <div className="hidden items-center gap-4 text-sm md:flex">
              <span className="text-muted-foreground">স্বাগতম, {email || 'শিক্ষার্থী'}</span>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                নতুন আপডেট আসছে
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Support Message */}
          <div className="mb-6 rounded-lg border bg-blue-50 p-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="font-hind-siliguri text-blue-800">
আপনাদের মতামত অনুযায়ী আমরা আমাদের কমিউনিটিকে এখন Discord-এ স্থানান্তর করেছি। যদি কেউ Discord ব্যবহার করতে না বোঝেন বা কীভাবে যোগ দিতে হয় সেটা না বুঝেন, তাহলে "Discord Guide Video" বাটনে ক্লিক করুন — সেখানে ধাপে ধাপে বিস্তারিতভাবে দেখানো আছে।

সাপোর্ট বা কোনো সমস্যার ক্ষেত্রে দয়া করে #support-requests চ্যানেলে মেসেজ দিন। যদি কোনো টেকনিক্যাল সমস্যা বা কনফিউশন ফেস করেন, তাহলে একটি স্ক্রিন রেকর্ড করে সেই চ্যানেলেই পাঠিয়ে দিন — আপনার ইস্যুটি যত দ্রুত সম্ভব সমাধান করে দেওয়া হবে। </p>
              <p className="font-hind-siliguri">
                কোর্স কিনার পর <span className="text-red-600 font-semibold">N8N INVITE</span> পেতে ডিসকর্ড সার্ভারে যোগ দিন এবং “get-n8n-access” চ্যানেলে গেলে ভিডিও গাইড পাবেন N8N ইনভাইট নেওয়ার জন্য।
              </p>
              
              {/* Discord Guide Video Button */}
              <div className="w-full max-w-md mx-auto my-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-hind-siliguri flex items-center gap-2"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      ডিসকর্ড গাইড ভিডিও দেখুন
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle className="font-hind-siliguri">ডিসকর্ড গাইড ভিডিও</DialogTitle>
                      <DialogDescription className="font-hind-siliguri">
                        ডিসকর্ড ব্যবহার করার নিয়ম দেখুন
                      </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video w-full">
                      <script src="https://fast.wistia.com/player.js" async></script>
                      <script src="https://fast.wistia.com/embed/medias/accqcrnkv9.jsonp" async></script>
                      <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
                      <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                        <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                          <div className="wistia_embed wistia_async_accqcrnkv9 videoFoam=true" style={{ height: '100%', position: 'relative', width: '100%' }}>
                            <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 1, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
                              <img src="https://fast.wistia.com/embed/medias/accqcrnkv9/swatch" style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  variant="default"
                  className="bg-[#25D366] hover:bg-[#128C7E]"
                  onClick={() => window.open('https://wa.me/+8801779749047', '_blank')}
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.5l4.6-1.474A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0ZM7.029 16.95c-.269.269-.592.484-.946.635a2.887 2.887 0 0 1-1.097.225H5.08a2.772 2.772 0 0 1-.415-.033 4.185 4.185 0 0 1-.673-.14 8.318 8.318 0 0 1-.775-.279c-.269-.116-.491-.224-.664-.327-.087-.052-.173-.104-.26-.156C.797 15.633 0 13.89 0 12 0 5.925 5.037.888 11.112.888c2.555 0 4.959.995 6.767 2.803C19.687 5.5 20.682 7.904 20.682 10.46c0 6.075-5.037 11.112-11.112 11.112-.909 0-1.796-.11-2.643-.319l-4.054 1.29 1.293-3.885a8.188 8.188 0 0 1-.419-.572c-.161-.242-.308-.498-.438-.766a6.705 6.705 0 0 1-.28-.665 4.317 4.317 0 0 1-.14-.673 2.77 2.77 0 0 1-.033-.415V5.08c0-.378.075-.742.225-1.097.151-.354.366-.677.635-.946.269-.269.592-.484.946-.635.355-.15.72-.225 1.097-.225h.106c.378 0 .742.075 1.097.225.354.151.677.366.946.635.269.269.484.592.635.946.15.355.225.72.225 1.097v.106c0 .378-.075.742-.225 1.097-.151.354-.366.677-.635.946Z"/>
                  </svg>
                  হোয়াটসঅ্যাপে মেসেজ করুন
                </Button>
                <Button 
                  variant="default"
                  className="bg-[#5865F2] hover:bg-[#4752C4]"
                  onClick={() => window.open('https://discord.gg/VP5fJSgwCT', '_blank')}
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                  ডিসকর্ড কমিউনিটিতে যোগ দিন
                </Button>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="mx-auto max-w-4xl">
            <LessonContent
              lesson={selectedLesson}
              currentIndex={currentIndex}
              totalLessons={lessons.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background px-4 py-3 text-center lg:px-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VibeTech. All rights reserved.
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
            <span className="mx-2">|</span>
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}