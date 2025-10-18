import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPurchaseConfirmationEmailHtml } from '@/lib/email-templates';
import { SITE_CONFIG, PRICING } from '@/lib/constants';


const HARDCODED_RESEND_API_KEY = 're_QUBT1tMm_KUkMMk13Tb1hr8T5jfZTMpVw';
const HARDCODED_EMAIL_FROM = 'no-reply@support.vibeacademy.app'; // Updated with proper domain
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Removed N8N API URL and AUTH TOKEN constants

const SUPABASE_FUNCTIONS_URL = "https://ojpbxfeerhcrcmhmktab.supabase.co/functions/v1/emails";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcGJ4ZmVlcmhjcmNtaG1rdGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzQxNzcsImV4cCI6MjA3MDg1MDE3N30.APuEvGxTNKWhWniDoAGFHT-cMyl5PxW41JwGt6pMius";

// Simple test endpoint to check if Resend API is working
export async function GET(request: Request) {
  console.log('TEST EMAIL API: Request received');
  const resend = new Resend(HARDCODED_RESEND_API_KEY);
  
  try {
    const url = new URL(request.url);
    const testEmail = url.searchParams.get('email');
    
    if (!testEmail) {
      return NextResponse.json({ 
        message: 'Missing email parameter. Use ?email=your@email.com to test', 
        success: false 
      }, { status: 400 });
    }
    
    console.log(`TEST EMAIL API: Attempting to send test email to ${testEmail}`);
    
    const { data, error } = await resend.emails.send({
      from: HARDCODED_EMAIL_FROM,
      to: [testEmail],
      subject: 'Test Email from Vibe Tech',
      html: '<h1>This is a test email</h1><p>If you received this, the email system is working correctly.</p>',
    });
    
    if (error) {
      console.error('TEST EMAIL API: Error sending test email:', error);
      return NextResponse.json({ 
        message: 'Failed to send test email', 
        error: error.message,
        success: false 
      }, { status: 500 });
    }
    
    console.log('TEST EMAIL API: Test email sent successfully:', data);
    return NextResponse.json({ 
      message: 'Test email sent successfully', 
      emailId: data?.id,
      success: true 
    });
    
  } catch (error) {
    console.error('TEST EMAIL API: Error:', error);
    return NextResponse.json({ 
      message: 'Error testing email API', 
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log('POST-PAYMENT API: Request received');
  const resend = new Resend(HARDCODED_RESEND_API_KEY);
  console.log('POST-PAYMENT API: Resend instance created with key:', HARDCODED_RESEND_API_KEY.substring(0, 5) + '...');

  try {
    const body = await request.json();
    console.log('POST-PAYMENT API: Request body parsed:', JSON.stringify(body, null, 2));
    const { userName, userEmail, invoiceId, phone } = body;

    if (!userName || !userEmail || !invoiceId) {
      console.error('POST-PAYMENT API: Missing required fields', { userName, userEmail, invoiceId });
      return NextResponse.json({ message: 'Missing required fields (userName, userEmail, invoiceId)' }, { status: 400 });
    }

    const courseName = SITE_CONFIG.name;
    const purchaseDate = new Date().toISOString();
    console.log(`POST-PAYMENT API: Processing payment for course: ${courseName}, user: ${userName}, email: ${userEmail}`);

    // Store email in Supabase Edge Function
    try {
      console.log('POST-PAYMENT API: Attempting to store email in Supabase Edge Function...');
      const supabaseResponse = await fetch(SUPABASE_FUNCTIONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!supabaseResponse.ok) {
        const errorText = await supabaseResponse.text();
        throw new Error(`Supabase Edge Function error: ${supabaseResponse.status} - ${errorText}`);
      }

      const supabaseData = await supabaseResponse.json();
      console.log('POST-PAYMENT API: Supabase Edge Function response:', JSON.stringify(supabaseData, null, 2));
      if (supabaseData.success) {
        console.log(`POST-PAYMENT API: Email ${userEmail} stored successfully in Supabase.`);
      } else {
        console.warn(`POST-PAYMENT API: Supabase Edge Function reported non-success for email ${userEmail}:`, supabaseData.message);
      }
    } catch (supabaseError) {
      console.error('POST-PAYMENT API: Error storing email in Supabase Edge Function:', supabaseError);
    }

    // Removed N8N API call logic

    const emailHtml = getPurchaseConfirmationEmailHtml(
      userName,
      courseName,
      invoiceId,
      appUrl,
      null // inviteAcceptUrl is always null now
    );
    console.log('POST-PAYMENT API: Email HTML generated, attempting to send email');

    try {
      const { data, error: emailError } = await resend.emails.send({
        from: HARDCODED_EMAIL_FROM,
        to: [userEmail],
        subject: `আপনার ${courseName} কোর্স ক্রয়ের নিশ্চিতকরণ - VIBE TECH`,
        html: emailHtml,
      });

      if (emailError) {
        console.error('POST-PAYMENT API: Resend API Error:', emailError);
        return NextResponse.json({ 
          message: 'Failed to send confirmation email.', 
          error: emailError.message,
          details: {
            from: HARDCODED_EMAIL_FROM,
            to: userEmail,
            subject: `আপনার ${courseName} কোর্স ক্রয়ের নিশ্চিতকরণ - VIBE TECH`
          }
        }, { status: 500 });
      }

      console.log('POST-PAYMENT API: Confirmation email sent successfully:', data);
      return NextResponse.json({ 
        message: 'Post-payment actions completed successfully. Email sent.', 
        emailId: data?.id,
        success: true
      });
    } catch (emailSendError) {
      console.error('POST-PAYMENT API: Error sending email with Resend:', emailSendError);
      return NextResponse.json({ 
        message: 'Error sending email with Resend API', 
        error: emailSendError instanceof Error ? emailSendError.message : 'Unknown email sending error',
        success: false
      }, { status: 500 });
    }
  } catch (error) {
    console.error('POST-PAYMENT API: General error in post-payment-actions:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ 
      message: 'Failed to process post-payment actions.', 
      error: errorMessage,
      success: false
    }, { status: 500 });
  }
} 
