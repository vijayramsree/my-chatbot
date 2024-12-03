import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import { useLoading } from '@/app/providers/LoadingProvider';
import { useRouter } from 'next/navigation';

jest.mock('@/app/providers/LoadingProvider');
jest.mock('next/navigation', () => ({
 useRouter: jest.fn()
}));

describe('Header', () => {
 const mockPush = jest.fn();
 const mockSetUser = jest.fn();

 beforeEach(() => {
   jest.clearAllMocks();
   (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
 });

 it('should not render when user is null', () => {
   (useLoading as jest.Mock).mockReturnValue({
     user: null,
     setUser: mockSetUser
   });

   render(<Header />);
   expect(screen.queryByText(/Hello/)).not.toBeInTheDocument();
 });

 it('should render user greeting and logout button when user exists', () => {
   (useLoading as jest.Mock).mockReturnValue({
     user: 'admin',
     setUser: mockSetUser
   });

   render(<Header />);
   
   expect(screen.getByText('Hello, admin')).toBeInTheDocument();
   expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
 });

 it('should handle logout correctly', async () => {
   global.fetch = jest.fn().mockResolvedValueOnce({});
   (useLoading as jest.Mock).mockReturnValue({
     user: 'admin',
     setUser: mockSetUser
   });

   render(<Header />);
   
   const logoutButton = screen.getByRole('button', { name: 'Logout' });
   await fireEvent.click(logoutButton);

   expect(fetch).toHaveBeenCalledWith('/api/auth/logout', { method: 'POST' });
   expect(mockSetUser).toHaveBeenCalledWith(null);
   expect(mockPush).toHaveBeenCalledWith('/login');
 });

 it('should handle logout error', async () => {
   const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
   global.fetch = jest.fn().mockRejectedValueOnce(new Error('Logout failed'));
   
   (useLoading as jest.Mock).mockReturnValue({
     user: 'admin',
     setUser: mockSetUser
   });

   render(<Header />);
   
   await fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
   
   expect(consoleSpy).toHaveBeenCalledWith('Logout failed:', expect.any(Error));
   consoleSpy.mockRestore();
 });
});
