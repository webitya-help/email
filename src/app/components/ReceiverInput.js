'use client';
import { useState } from 'react';

export default function ReceiverInput() {
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');

  const validateEmails = (input) => {
    return input
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const saveReceivers = () => {
    const emailList = validateEmails(emails);

    const invalids = emailList.filter(email => !isValidEmail(email));
    if (invalids.length > 0) {
      setError(`Invalid emails: ${invalids.join(', ')}`);
      return;
    }

    localStorage.setItem('receivers', emailList.join(','));
    setError('');
    alert('✅ Valid client emails saved!');
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 my-4 w-full max-w-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📧 Client Emails</h3>

      <textarea
        placeholder="Enter emails, comma separated"
        value={emails}
        onChange={e => setEmails(e.target.value)}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
      />

      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}

      <button
        onClick={saveReceivers}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Save Emails
      </button>
    </div>
  );
}
