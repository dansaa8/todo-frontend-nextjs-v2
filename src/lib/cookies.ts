import { cookies } from 'next/headers';

export const getToken = (): string | undefined => {
  const token = cookies().get('token')?.value;
  return token;
};
