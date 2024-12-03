/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Callout, Heading } from '@radix-ui/themes';
import { Loader } from '@/components/Loader';
import { useLoading } from '@/app/providers/LoadingProvider';

export default function Login() {
  const router = useRouter();
  const { setUser, setIsLoading } = useLoading();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('user', data.user);
        setUser(data.user);
        router.push('/upload');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('An error occurred during login');
    }
    setIsLoading(false);
  };

  return (
    <main className="flex h-full flex-col items-center justify-between p-6 sm:p-12 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div className="m-auto relative">
            <Loader />
            <div className="text-center m-auto">
                {error && (
                <Callout.Root mb="6" color="red">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
                )}
            <Heading as="h1" size="8" mb="4">
                <img data-testid="NM" src="https://www.northwesternmutual.com/template/assets/3.8.17/images/logos/logo-horizontal-navy.svg" alt="NM" />
            </Heading>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <TextField.Root
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                
                <TextField.Root
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
              </div>
              <Button 
                type="submit"
                className="w-full"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}