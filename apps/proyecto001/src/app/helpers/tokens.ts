import jwt from 'jsonwebtoken';

interface TokenPayload {
   id:string
}

export const generateToken = (payload: TokenPayload, expired: string) => {
  const tokenSecret = process.env.TOKEN_SECRET;
  if (!tokenSecret) {
    throw new Error('TOKEN_SECRET not defined in the environment variables');
  }
  return jwt.sign(payload, tokenSecret, {
    expiresIn: expired,
  });
};