import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../page';
import { useLoading } from '@/app/providers/LoadingProvider';
import { useRouter } from 'next/navigation';

jest.mock('@/app/providers/LoadingProvider');
jest.mock('next/navigation', () => ({
 useRouter: jest.fn()
}));

describe('Login', () => {
 const mockPush = jest.fn();
 const mockSetUser = jest.fn();
 const mockSetIsLoading = jest.fn();

 beforeEach(() => {
   jest.clearAllMocks();

   const mockLocalStorage = {
     getItem: jest.fn(),
     setItem: jest.fn(),
     removeItem: jest.fn()
   };
   Object.defineProperty(window, 'localStorage', {
     value: mockLocalStorage,
     writable: true
   });

   (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
   (useLoading as jest.Mock).mockReturnValue({
     setUser: mockSetUser,
     setIsLoading: mockSetIsLoading
   });
 });

 it('renders login form', () => {
   render(<Login />);
   expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
   expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
   expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
   expect(screen.getByTestId('NM')).toBeInTheDocument();
 });

 it('handles successful login', async () => {
   global.fetch = jest.fn().mockResolvedValueOnce({
     ok: true,
     json: () => Promise.resolve({ user: 'admin' })
   });

   render(<Login />);

   const usernameInput = screen.getByPlaceholderText('Username');
   const passwordInput = screen.getByPlaceholderText('Password');
   
   fireEvent.change(usernameInput, { target: { value: 'admin' } });
   fireEvent.change(passwordInput, { target: { value: 'password' } });
   fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

   await waitFor(() => {
     expect(mockSetIsLoading).toHaveBeenCalledWith(true);
     expect(mockSetUser).toHaveBeenCalledWith('admin');
     expect(mockPush).toHaveBeenCalledWith('/upload');
     expect(localStorage.setItem).toHaveBeenCalledWith('user', 'admin');
   });
 });

 it('handles login failure', async () => {
   global.fetch = jest.fn().mockResolvedValueOnce({
     ok: false,
     json: () => Promise.resolve({ message: 'Invalid credentials' })
   });

   render(<Login />);

   fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

   await waitFor(() => {
     expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
     expect(mockSetUser).not.toHaveBeenCalled();
     expect(mockPush).not.toHaveBeenCalled();
   });
 });

 it('handles network error', async () => {
   global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

   render(<Login />);

   fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

   await waitFor(() => {
     expect(screen.getByText('An error occurred during login')).toBeInTheDocument();
     expect(mockSetUser).not.toHaveBeenCalled();
     expect(mockPush).not.toHaveBeenCalled();
   });
 });

 it('validates required fields', () => {
   render(<Login />);
   
   const usernameInput = screen.getByPlaceholderText('Username');
   const passwordInput = screen.getByPlaceholderText('Password');
   
   expect(usernameInput).toBeRequired();
   expect(passwordInput).toBeRequired();
 });
});
