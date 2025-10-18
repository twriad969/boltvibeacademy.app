import { NextResponse } from 'next/server';

// Hardcoded credentials (NOT RECOMMENDED FOR PRODUCTION)
const ADMIN_USERNAME = "ronok";
const ADMIN_PASSWORD = "ronok111";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // No cookie setting, client will manage login state
      return NextResponse.json({ success: true, message: 'Login successful' });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred during login' }, { status: 500 });
  }
} 
