'use client';
import { useState } from 'react';

export default function TemplateEditor() {
  const [template, setTemplate] = useState('');

  const saveTemplate = () => {
    localStorage.setItem('template', template);
    alert('✅ Template saved!');
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-gray-100 rounded-lg shadow-md  mt-10 w-full max-w-xl">
      <h3 className="text-2xl font-semibold text-gray-800">Email Template</h3>
      <textarea
        placeholder="Enter your email template here"
        value={template}
        onChange={e => setTemplate(e.target.value)}
        className="w-full h-40 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={saveTemplate}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save Template
      </button>
    </div>
  );
}
