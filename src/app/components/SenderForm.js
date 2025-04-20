'use client';
import { useEffect, useState } from 'react';

export default function SenderForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [senders, setSenders] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');

  useEffect(() => {
    const storedSenders = JSON.parse(localStorage.getItem('senders') || '[]');
    setSenders(storedSenders);
  }, []);

  const saveSender = () => {
    if (!email || !password) {
      alert('⚠️ Please enter both email and password.');
      return;
    }

    const newSender = { email, pass: password.replace(/\s/g, '') };
    const updatedSenders = [...senders, newSender];

    localStorage.setItem('senders', JSON.stringify(updatedSenders));
    setSenders(updatedSenders);
    setEmail('');
    setPassword('');
    alert('✅ Sender email saved successfully!');
  };

  const handleSelect = (selected) => {
    setSelectedEmail(selected);
    const found = senders.find(sender => sender.email === selected);
    if (found) {
      setEmail(found.email);
      setPassword(found.pass);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 my-4 w-full max-w-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">✉️ Sender Email Details</h3>

      {senders.length > 0 && (
        <select
          value={selectedEmail}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Saved Sender --</option>
          {senders.map((sender, index) => (
            <option key={index} value={sender.email}>
              {sender.email}
            </option>
          ))}
        </select>
      )}

      <input
        type="email"
        placeholder="Sender Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />

      <div className="relative w-full mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="App Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <label className="flex items-center mt-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          Show Password
        </label>
      </div>

      <button
        onClick={saveSender}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        💾 Save Sender
      </button>
    </div>
  );
}
