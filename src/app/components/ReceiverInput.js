'use client';
import { useState } from 'react';

export default function ReceiverInput() {
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const extractEmails = (text) => {
    return text
      .split(/[\s,;]+/)
      .map(e => e.trim())
      .filter(e => isValidEmail(e));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Only .csv files are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const emailList = extractEmails(text);
      if (emailList.length === 0) {
        setError('No valid emails found in CSV.');
      } else {
        setEmails((prev) => {
          const prevEmails = extractEmails(prev);
          const combined = [...new Set([...prevEmails, ...emailList])];
          return combined.join(', ');
        });
        setError('');
        setFileName(file.name);
      }
    };
    reader.readAsText(file);
  };

  const saveReceivers = () => {
    const emailList = extractEmails(emails);
    if (emailList.length === 0) {
      setError('No valid emails to save.');
      return;
    }

    localStorage.setItem('receivers', emailList.join(','));
    setError('');
    alert('✅ Valid client emails saved!');
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 my-4 w-full max-w-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📧 Client Emails</h3>

      {/* Manual Input */}
      <label className="block text-sm font-medium text-gray-600 mb-1">Manual Entry</label>
      <textarea
        placeholder="Enter emails, comma separated"
        value={emails}
        onChange={e => setEmails(e.target.value)}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
      />

      {/* File Upload */}
      <label className="block text-sm font-medium text-gray-600 mt-4 mb-1">Or Upload CSV</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {fileName && <p className="text-sm text-gray-500 mt-1">📎 Uploaded: {fileName}</p>}

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}

      {/* Save Button */}
      <button
        onClick={saveReceivers}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Save Emails
      </button>
    </div>
  );
}
