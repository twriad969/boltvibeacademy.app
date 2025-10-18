
import { NextRequest, NextResponse } from 'next/server';
import { sendPurchaseEventToCAPI } from '@/lib/capi';

// Supabase configuration for event deduplication
const SUPABASE_URL = 'https://ojpbxfeerhcrcmhmktab.supabase.co/functions/v1';
const SUPABASE_AUTH = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcGJ4ZmVlcmhjcmNtaG1rdGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQxNzcsImV4cCI6MjA3MDg1MDE3N30.APuEvGxTNKWhWniDoAGFHT-cMyl5PxW41JwGt6pMius';

// Store event ID in database to prevent duplicates
const storeEventId = async (eventId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/initial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': SUPABASE_AUTH,
      },
      body: JSON.stringify({
        userId: eventId,
        userMode: '#AI'
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data.success === true;
    }
    return false;
  } catch (error) {
    console.error('Error storing event ID in database:', error);
    return false;
  }
};

// Check if event ID already exists in database
const checkEventExists = async (eventId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/check?userId=${encodeURIComponent(eventId)}`, {
      method: 'GET',
      headers: {
        'Authorization': SUPABASE_AUTH,
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.success === true && data.data !== null && data.data !== undefined;
    }
    return false;
  } catch (error) {
    console.error('Error checking event ID in database:', error);
    return false;
  }
};

// Better client IP detection for serverless/edge runtimes
const getClientIP = (req: NextRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return req.headers.get('x-real-ip') || 
         req.headers.get('cf-connecting-ip') || 
         req.headers.get('x-client-ip') ||
         'unknown';
};

export async function POST(req: NextRequest) {
  // Endpoint disabled
  return NextResponse.json({ message: 'CAPI purchase endpoint temporarily disabled' }, { status: 503 });
}
