import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Re-use the hardcoded Redis URL from the admin purchases route
// (NOT RECOMMENDED FOR PRODUCTION - should be an environment variable)
const REDIS_URL = process.env.REDIS_URL || "redis://default:ATXBAAIjcDEzOTM4NWM0MjAxZGQ0NTI5ODdiZTE5ZWUyZWU1ZWIwZnAxMA@loyal-maggot-13761.upstash.io:6379";

let redis: Redis | null = null;
try {
  redis = new Redis(REDIS_URL, {
    tls: { rejectUnauthorized: false }, 
    connectTimeout: 10000,
    maxRetriesPerRequest: 3,
  });
  console.log('Attempting to connect to Redis (course-area-verify-email)...');
  redis.on('connect', () => console.log('Successfully connected to Redis (course-area-verify-email).'));
  redis.on('error', (err) => console.error('Redis connection error (course-area-verify-email):', err));
} catch (error) {
  console.error('Failed to initialize Redis client (course-area-verify-email):', error);
  redis = null;
}

export async function POST(request: Request) {
  // Set CORS headers to allow all origins
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS request (preflight)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 200,
      headers: corsHeaders
    });
  }
  
  if (!redis) {
    return NextResponse.json(
      { success: false, message: 'Redis connection not available.' }, 
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required.' }, 
        { status: 400, headers: corsHeaders }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Scan all purchase keys (this could be slow with many keys, consider a different data structure for lookups if performance becomes an issue)
    const purchaseKeys = await redis.keys('purchase:*');
    if (purchaseKeys.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No purchase records found.' },
        { headers: corsHeaders }
      );
    }

    let emailFound = false;
    for (const key of purchaseKeys) {
      const purchaseData = await redis.hgetall(key);
      if (purchaseData && purchaseData.userEmail && purchaseData.userEmail.toLowerCase() === normalizedEmail) {
        emailFound = true;
        break;
      }
    }

    if (emailFound) {
      return NextResponse.json(
        { success: true, message: 'Access granted.' },
        { headers: corsHeaders }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Email not found in purchase records. Access denied.' },
        { headers: corsHeaders }
      );
    }

  } catch (error) {
    console.error('Error verifying email in Redis:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during email verification.' },
      { status: 500, headers: corsHeaders }
    );
  }
} 
