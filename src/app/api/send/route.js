// /app/api/send/route.js

import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  const { to, subject, html, senderEmail, senderPass } = body;

  // Validate input
  if (!to || !subject || !html || !senderEmail || !senderPass) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Missing required fields.'
    }), { status: 400 });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
  });

  // Clean plain text version (fallback for spam filters)
  const plainText = html.replace(/<[^>]*>/g, '');

  const enhancedHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      ${html}
      <br/><br/>
      <hr/>
      <p style="font-size: 12px; color: #777;">
        You're receiving this email from ${senderEmail}.<br>
        If you did not request this or no longer want to receive emails, please ignore this message or <a href="#">unsubscribe</a>.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: {
        name: 'SK COOL Service',
        address: senderEmail,
      },
      to,
      subject,
      text: plainText,
      html: enhancedHtml,
      headers: {
        'X-Mailer': 'Nodemailer',
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      detail: error.response || error.toString()
    }), { status: 500 });
  }
}
