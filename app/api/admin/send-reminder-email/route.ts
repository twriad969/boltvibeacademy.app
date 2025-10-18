import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// IMPORTANT: These are hardcoded for now, similar to your existing post-payment-actions.
// It is strongly recommended to move these to environment variables.
const HARDCODED_RESEND_API_KEY = 're_QUBT1tMm_KUkMMk13Tb1hr8T5jfZTMpVw';
const HARDCODED_EMAIL_FROM = 'no-reply@support.vibeacademy.app';

const reminderEmailHtml = `
<!DOCTYPE html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />
    <title>আপনার স্পেশাল ডিসকাউন্ট</title>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: 'Hind Siliguri', sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f2f2f2">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color: #121212; padding: 30px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 26px; text-align: center;">
                  ৫০০ টাকা ছাড়ে কোর্সটি এখন নিতে পারেন মাত্র ১০০০ টাকায়!
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px; color: #333333; line-height: 1.6; text-align: center;">
                  আপনি <strong>AI Agent Automation কোর্সের</strong> checkout এ গিয়েছিলেন কিন্তু কেন যেন শেষ মুহূর্তে থেমে গেছেন।
                  <br><br>
                  আমরা জানি, মাঝে মাঝে সিদ্ধান্ত নেওয়াটা কঠিন হতে পারে। তাই <strong>শুধু আপনার জন্য</strong> আমরা দিচ্ছি একটি <span style="color: #e53935; font-weight: bold;">৫০০৳ ডিসকাউন্ট</span>!
                </p>

                <p style="font-size: 18px; color: #111; text-align: center; margin: 30px 0 10px 0;">
                  আগে ছিল: <s>১৫০০৳</s><br />
                  এখন পাচ্ছেন মাত্র: <span style="color: #2196f3; font-weight: bold;">১০০০৳</span><br>
                  <span style="color: #4CAF50; font-weight: bold;">আপনি বাঁচাচ্ছেন: ৫০০৳</span>
                </p>

                <!-- Scarcity & Social Proof -->
                <p style="font-size: 15px; color: #d32f2f; text-align: center; margin-top: 30px;">
                  ⏳ <strong>মাত্র ৫ জন এনরোল করলেই অফার বন্ধ হয়ে যাবে!</strong>
                </p>
                <p style="font-size: 14px; color: #555555; text-align: center;">
                  💥 ১০০+ স্টুডেন্ট ইতিমধ্যেই এনরোল করেছেন
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://vibeacademy.app/vibeonlyoffer" style="background-color: #4CAF50; color: white; padding: 14px 30px; text-decoration: none; font-size: 16px; border-radius: 6px; font-weight: bold;">
                    ডিসকাউন্টে এনরোল করুন এখনই
                  </a>
                </div>

                <!-- Warning / Urgency -->
                <p style="text-align: center; font-size: 13px; color: #999999; margin-top: 30px;">
                  অফারটি ২৪ ঘণ্টার মধ্যেই বন্ধ হয়ে যেতে পারে—এখনই সিদ্ধান্ত নিন।
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #121212; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                © 2025 Vibe Academy<br>
                আপনি এই মেইল পেয়েছেন কারণ আপনি আমাদের কোর্স checkout করেছেন।
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;


export async function POST(request: Request) {
  const resend = new Resend(HARDCODED_RESEND_API_KEY);

  try {
    const body = await request.json();
    const { userEmail } = body;

    if (!userEmail) {
      return NextResponse.json({ message: 'Missing required field: userEmail' }, { status: 400 });
    }

    // Validate email format (basic validation)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }
    
    const emailSubject = "৫০০ টাকা ছাড়ে কোর্সটি এখন নিতে পারেন মাত্র ১০০০ টাকায়!"; // Subject in Bengali

    const { data, error: emailError } = await resend.emails.send({
      from: HARDCODED_EMAIL_FROM,
      to: [userEmail],
      subject: emailSubject,
      html: reminderEmailHtml,
    });

    if (emailError) {
      console.error('Resend API Error (Admin Reminder):', emailError);
      return NextResponse.json({ message: 'Failed to send reminder email.', error: emailError.message }, { status: 500 });
    }

    console.log('Admin reminder email sent successfully to:', userEmail, 'Email ID:', data?.id);
    return NextResponse.json({ message: 'Reminder email sent successfully.', emailId: data?.id });

  } catch (error) {
    console.error('Error in send-reminder-email route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message: 'Failed to process request.', error: errorMessage }, { status: 500 });
  }
} 
