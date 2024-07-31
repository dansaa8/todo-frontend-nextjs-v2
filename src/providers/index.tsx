// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SnackbarProvider } from '@/providers/snackbar-context';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </NextUIProvider>
  );
}
