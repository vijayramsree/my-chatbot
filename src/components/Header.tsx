"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@radix-ui/themes';
import { useLoading } from '@/app/providers/LoadingProvider';

export const Header = () => {
  const router = useRouter();
  const { user, setUser } = useLoading();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if(user) {
    return (
      <div className="flex items-center justify-end py-2">
        <div className="flex items-center space-x-4">
            <>
              <span className="text-gray-700">Hello, {user}</span>
              <Button 
                variant="soft" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
        </div>
      </div>
    );
  }
};
