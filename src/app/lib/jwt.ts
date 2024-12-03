/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return error;
  }
};
