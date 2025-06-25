'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/admin/updatecontent');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
