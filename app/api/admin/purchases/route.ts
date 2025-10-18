import { NextResponse } from 'next/server';
import Redis from 'ioredis';
import crypto from 'crypto';

// Hardcoded Redis URL (NOT RECOMMENDED FOR PRODUCTION)
const HARDCODED_REDIS_URL = "redis://default:ATXBAAIjcDEzOTM4NWM0MjAxZGQ0NTI5ODdiZTE5ZWUyZWU1ZWIwZnAxMA@loyal-maggot-13761.upstash.io:6379";

// !!! SECURITY WARNING: Hardcoding keys is NOT recommended for production. !!!
const HARDCODED_ENCRYPTION_KEY = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"; 
const encryptionKeyBuffer = Buffer.from(HARDCODED_ENCRYPTION_KEY, 'hex');

// Encryption function using AES-256-CBC
function encrypt(text: string, key: Buffer): string {
  const iv = crypto.randomBytes(16); // AES block size for CBC is 16 bytes
  const cipher = crypto.createCipheriv('aes-256-cbc', key as unknown as crypto.CipherKey, iv as unknown as crypto.BinaryLike);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Prepend IV to the encrypted data for use in decryption
  return iv.toString('hex') + ':' + encrypted;
}

let redis: Redis | null = null;
try {
  redis = new Redis(HARDCODED_REDIS_URL, {
    tls: { rejectUnauthorized: false }, 
    connectTimeout: 10000,
    maxRetriesPerRequest: 3,
  });
  console.log('Attempting to connect to Redis with hardcoded URL (admin-purchases)...');
  redis.on('connect', () => console.log('Successfully connected to Redis (admin-purchases).'));
  redis.on('error', (err) => console.error('Redis connection error (admin-purchases):', err));
} catch (error) {
  console.error('Failed to initialize Redis client (admin-purchases):', error);
  redis = null;
}

export async function GET(request: Request) {
  // Use the hardcoded key
  if (encryptionKeyBuffer.length !== 32) { // Basic check
    console.error('GET /api/admin/purchases: Hardcoded encryption key is invalid (must be 32 bytes).');
    return NextResponse.json({ success: false, message: 'Server configuration error: Encryption key invalid.' }, { status: 500 });
  }

  if (!redis) {
    console.error('GET /api/admin/purchases: Redis connection not available.');
    return NextResponse.json({ success: false, message: 'Redis connection not available.' }, { status: 500 });
  }

  try {
    console.log('GET /api/admin/purchases: Attempting to fetch purchase keys from Redis.');
    const purchaseKeys = await redis.keys('purchase:*');
    console.log(`GET /api/admin/purchases: Found ${purchaseKeys.length} purchase keys:`, purchaseKeys);

    if (purchaseKeys.length === 0) {
      console.log('GET /api/admin/purchases: No purchase keys found. Returning empty encrypted data.');
      const encryptedData = encrypt(JSON.stringify([]), encryptionKeyBuffer);
      return NextResponse.json({ success: true, encryptedData });
    }

    const pipeline = redis.pipeline();
    purchaseKeys.forEach(key => pipeline.hgetall(key));
    console.log('GET /api/admin/purchases: Executing Redis pipeline to fetch purchase data.');
    const results = await pipeline.exec();
    console.log('GET /api/admin/purchases: Raw results from Redis pipeline:', JSON.stringify(results));

    const purchases = results?.map(([err, data], index) => {
      if (err) {
        console.error(`GET /api/admin/purchases: Error fetching data for key ${purchaseKeys[index]} from Redis pipeline:`, err);
        return null;
      }
      console.log(`GET /api/admin/purchases: Successfully fetched data for key ${purchaseKeys[index]}:`, data);
      return data;
    }).filter(p => p !== null) || [];

    console.log('GET /api/admin/purchases: Processed purchases:', JSON.stringify(purchases));
    
    const encryptedData = encrypt(JSON.stringify(purchases), encryptionKeyBuffer);
    console.log('GET /api/admin/purchases: Encrypted data being sent (AES-256-CBC).');
    return NextResponse.json({ success: true, encryptedData });

  } catch (error) {
    console.error('GET /api/admin/purchases: Error fetching or encrypting purchases:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch or encrypt purchases' }, { status: 500 });
  }
} 
