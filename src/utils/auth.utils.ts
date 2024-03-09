import { sign, verify } from 'jsonwebtoken';

const TOKEN_KEY = process.env['TOKEN_KEY'];

const createJWT = (user: string) => {
  return sign({ role: 'admin', user }, TOKEN_KEY);
};

const verifyJWT = (token: string): boolean => {
  try {
    const decoded = verify(token, TOKEN_KEY);
    return decoded.user;
  } catch (_) {
    return null;
  }
};

export { createJWT, verifyJWT };
