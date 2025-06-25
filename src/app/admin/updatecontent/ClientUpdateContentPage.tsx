'use client';
import { useState, useEffect } from 'react';

export default function ClientUpdateContentPage() {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/content');
      const data = await res.json();
      setText(data.description);
    };
    fetchData();
  }, []);

  const handleTextSave = async () => {
    await fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify({ description: text }),
    });
    alert('Text Updated!');
  };

  const handleImageUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const upload = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      await fetch('/api/content', {
        method: 'POST',
        body: JSON.stringify({ imageUrl: `/uploads/${file.name}` }),
      });
      alert('Image and path updated!');
    } else {
      alert('Upload failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/admin';
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded text-sm"
      >
        Logout
      </button>

      <h2 className="text-2xl font-bold">Update Content</h2>

      <textarea
        className="w-full p-2 border rounded h-40"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleTextSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Text
      </button>

      <hr className="my-6" />

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleImageUpload}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        Upload Image
      </button>
    </div>
  );
}
