import { NextResponse } from 'next/server';

// This route is now a dummy endpoint as admin state is client-side.
export async function POST(request: Request) {
  return NextResponse.json({ success: true, message: 'Logout processed (client-side state)' });
} 
