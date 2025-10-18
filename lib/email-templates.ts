export const getPurchaseConfirmationEmailHtml = (
    userName: string,
    courseName: string,
    invoiceId: string,
    appUrl: string,
    inviteAcceptUrl: string | null = null
  ): string => {
    const courseAreaLink = `${appUrl}/course-area`; // Updated link to the course area
    const whatsappLink = "https://wa.me/01744136934?text=Hi%20Vibe%20Academy%2C%20I%20need%20help%20with%20my%20course";
  
    return `<!doctype html>
<html lang="bn">
  <head>
    <meta charset="utf-8">
    <title>Vibe Academy – Course Access</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#f7f7f8;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border-radius:12px;padding:24px;border:1px solid #eee;">
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;color:#111;">
                <div style="font-size:18px;font-weight:700;margin-bottom:8px;">কোর্সে স্বাগতম! 🎉</div>
                <div style="font-size:14px;line-height:1.6;margin-bottom:16px;">
                  হ্যালো
                  আপনি আমাদের কোর্সটি ক্রয় করেছেন — ধন্যবাদ!
                </div>

                <!-- Course CTA -->
                <div style="margin:20px 0;">
                  <a href="${courseAreaLink}"
                     style="display:inline-block;text-decoration:none;font-family:Arial,Helvetica,sans-serif;
                            font-size:14px;padding:12px 18px;border-radius:8px;background:red;color:#ffffff;">
                    কোর্স এরিয়া খুলুন
                  </a>
                </div>

                <!-- Important login note -->
                <div style="font-size:14px;line-height:1.6;margin-bottom:16px;color:#b30000;font-weight:600;">
                  ⚠️ গুরুত্বপূর্ণ: কোর্স এরিয়াতে লগইন করার সময় অবশ্যই সেই ইমেইল ব্যবহার করুন, যেটি দিয়ে আপনি কোর্স ক্রয় করেছেন।
                </div>

                <!-- Support hours -->
                <div style="font-size:14px;line-height:1.6;margin-top:8px;margin-bottom:16px;color:#333;">
                  <strong>সাপোর্ট সময়:</strong> প্রতিদিন সন্ধ্যা ৭টা থেকে রাত ১২টা।<br>
                  যদি সাথে সাথে কিছু কাজ না করে, দুশ্চিন্তা করবেন না — ওই সময়ের মধ্যেই রিপ্লাই পাবেন।
                </div>

                <!-- WhatsApp button -->
                <div style="margin:16px 0;">
                  <a href="https://wa.me/01744136934?text=Hi%20Vibe%20Academy%2C%20I%20need%20help%20with%20my%20course"
                     style="display:inline-block;text-decoration:none;font-family:Arial,Helvetica,sans-serif;
                            font-size:14px;padding:10px 14px;border-radius:8px;border:1px solid #25D366;">
                    WhatsApp সাপোর্টে মেসেজ করুন
                  </a>
                </div>

                <div style="font-size:13px;line-height:1.6;margin-top:20px;color:#666;">
                  শুভেচ্ছা,<br>
                  <strong>Vibe Academy টিম</strong><br>
                  <a href="https://vibeacademy.app" style="color:#111;text-decoration:none;">vibeacademy.app</a>
                </div>

                <!-- small footer note -->
                <div style="font-size:12px;color:#888;margin-top:16px;line-height:1.5;">
                  আপনি এই ইমেইলটি পেয়েছেন কারণ আপনি Vibe Academy থেকে কোর্স ক্রয় করেছেন।
                  যদি ভুলবশত পেয়ে থাকেন, রিপ্লাই করে জানান।
                </div>
              </td>
            </tr>
          </table>

          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#999;margin-top:12px;">
            © Vibe Academy • Dhaka, Bangladesh
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  }; 
