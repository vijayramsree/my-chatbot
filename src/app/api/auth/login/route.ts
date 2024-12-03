import { NextResponse } from 'next/server';
import { signToken } from '@/app/lib/jwt';

const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'nmtest'
};

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    
    if (username !== VALID_CREDENTIALS.username || 
        password !== VALID_CREDENTIALS.password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const token = signToken({ username });
    
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: username 
      },
      { status: 200 }
    );
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400
    });
    
    return response;
  } catch {
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}
