'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../../styles/login.css';  // ✅ Use your global styles (already defined)

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'test@a.com' && password === '123456') {
      sessionStorage.setItem('token', 'dummy-token');
      router.push('/dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <main className="login-wrapper">
      {/* Left Pane - Login */}
      <div className="login-left">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Welcome back</h2>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="test@a.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="checkbox-container">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit">Sign In</button>
          <p className="copyright">© 2024 tentwenty</p>
        </form>
      </div>

      {/* Right Pane - Branding */}
      <div className="login-right">
        <div>
          <h1>ticktock</h1>
          <p>
            Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours.
            Track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
          </p>
        </div>
      </div>
    </main>
  );
}
