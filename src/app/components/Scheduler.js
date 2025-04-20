'use client';
import { useState } from 'react';

export default function SendEmails() {
  const [loading, setLoading] = useState(false);

  const sendEmails = async () => {
    setLoading(true);

    const senders = JSON.parse(localStorage.getItem('senders') || '[]');
    const receivers = localStorage.getItem('receivers') || '';
    const template = localStorage.getItem('template') || '';

    if (senders.length === 0 || !receivers || !template) {
      alert('❌ Missing sender, receivers, or template!');
      setLoading(false);
      return;
    }

    const sender = senders[0]; // Select from UI later if needed
    const toList = receivers.split(',').map(email => email.trim()).filter(Boolean);

    try {
      for (const to of toList) {
        const enhancedHtml = `
          <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            ${template}
            <br/><br/>
            <hr/>
            <p style="font-size: 12px; color: #777;">
              You're receiving this email from <strong>${sender.email}</strong>.<br/>
              If you didn't request this, please ignore.<br/>
              To unsubscribe, reply with "unsubscribe".
            </p>
          </div>
        `;

        const res = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to,
            subject: `📢 Important Update from Webitya`,
            html: enhancedHtml,
            senderEmail: sender.email,
            senderPass: sender.pass,
          }),
        });

        const result = await res.json();
        if (!result.success) throw new Error(result.error);

        // Delay between sends to avoid spam flagging
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      alert('✅ Emails sent successfully!');
    } catch (err) {
      alert(`❌ Failed to send email: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-6 bg-white shadow-lg rounded-lg w-full max-w-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Send Emails</h3>
      <button
        onClick={sendEmails}
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {loading ? 'Sending...' : '📤 Send Campaign'}
      </button>
    </div>
  );
}
