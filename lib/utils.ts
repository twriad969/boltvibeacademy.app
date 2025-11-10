import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Webhook provider to track checkout initiation and successful purchases
 */
export async function sendWebhookNotification(data: {
  name: string;
  email: string;
  phone: string;
  purchased: boolean;
}) {
  try {
    const webhookUrl = 'https://n8n.srv915514.hstgr.cloud/webhook/webhookforvibeacademy';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Webhook notification failed:', response.status, response.statusText);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending webhook notification:', error);
    return { success: false };
  }
}

/**
 * Client-side function to create a payment without using server API
 * This helps avoid cold starts on serverless functions
 */
export async function createClientSidePayment(data: { 
  name: string; 
  email: string; 
  phone?: string;
  amountOverride: number; // No longer optional
}) {
  try {
    const { name, email, phone, amountOverride } = data;
    
    if (!name || !email) {
      throw new Error('Missing required fields');
    }

    // Get the app URL from environment variables or use the current origin
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'https://vibeacademy.app/');
    const redirect_url = `${appBaseUrl}/payment/success`;
    const cancel_url = `${appBaseUrl}/payment/cancel`;

    // Use amountOverride directly as it's now always provided
    const finalAmount = amountOverride;
    
    const payload = {
      full_name: name,
      email: email,
      amount: finalAmount, // Use finalAmount here
      metadata: {
        phone: phone || '', // phone is optional in your form, handle if not present
      },
      redirect_url: redirect_url,
      cancel_url: cancel_url,
      return_type: 'GET',
    };

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // Use the API key from environment variables or fallback to hardcoded value
      'RT-UDDOKTAPAY-API-KEY': process.env.NEXT_PUBLIC_UDDOKTAPAY_API_KEY || 'isR0b4LtRKUEuqoWnuc2EuyRBOhcm3vKNQIWERfI'
    };

    const uddoktaPayResponse = await fetch('https://pay.vibeacademy.app/api/checkout-v2', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    let responseData;
    try {
      responseData = await uddoktaPayResponse.json();
    } catch (jsonError) {
      console.error('Error parsing UddoktaPay response JSON:', jsonError);
      return {
        success: false,
        message: 'Received an invalid response from the payment gateway.'
      };
    }

    if (uddoktaPayResponse.status === 200 && responseData.status === true && responseData.payment_url) {
      return { success: true, payment_url: responseData.payment_url };
    } else {
      // Use responseData.message if available, otherwise a generic error based on HTTP status
      return {
        success: false,
        message: responseData.message || `Payment initiation failed with status: ${uddoktaPayResponse.status} ${uddoktaPayResponse.statusText || ''}`
      };
    }
  } catch (error) {
    console.error('UddoktaPay API Error:', error);
    let errorMessage = 'An unexpected error occurred while initiating payment.';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return { success: false, message: errorMessage };
  }
}

/**
 * Client-side function to handle post-payment actions without server API
 * This helps avoid cold starts on serverless functions
 */
export async function handleClientSidePostPayment(data: {
  userName: string;
  userEmail: string;
  invoiceId: string;
  phone?: string;
}) {
  try {
    const { userName, userEmail, invoiceId, phone } = data;
    
    if (!userName || !userEmail || !invoiceId) {
      throw new Error('Missing required fields (userName, userEmail, invoiceId)');
    }

    console.log('Client-side post-payment: Sending request to API endpoint', {
      userName,
      userEmail: userEmail.substring(0, 3) + '...',
      invoiceId,
      hasPhone: !!phone
    });
    
    // For client-side, we need to use fetch instead of Resend SDK directly
    // We'll make a request to a lightweight endpoint that will handle the email sending
    
    const emailResponse = await fetch('/api/post-payment-actions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        userEmail,
        invoiceId,
        phone: phone || 'N/A',
      }),
    });

    // Check if the request was successful based on HTTP status
    if (!emailResponse.ok) {
      const errorData = await emailResponse.json().catch(() => ({ message: 'Failed to parse error response' }));
      console.error('Client-side post-payment: API response error', {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        errorData
      });
      throw new Error(errorData.message || `API error: ${emailResponse.status} ${emailResponse.statusText}`);
    }

    const responseData = await emailResponse.json();
    console.log('Client-side post-payment: API response success', responseData);
    
    if (!responseData.success) {
      throw new Error(responseData.message || 'API returned success: false without specific error message');
    }

    return { 
      success: true, 
      message: 'Post-payment actions completed successfully. Email sent.',
      emailId: responseData.emailId 
    };
  } catch (error) {
    console.error('Error in client-side post-payment actions:', error);
    let errorMessage = 'An unknown error occurred during post-payment processing.';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error instanceof Response) {
      errorMessage = `Network error: ${error.status} ${error.statusText}`;
    }
    
    return { success: false, message: errorMessage };
  }
}
