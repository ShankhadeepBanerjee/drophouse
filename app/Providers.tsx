'use client';
import { ClerkProvider } from '@clerk/nextjs';
import { HeroUIProvider } from '@heroui/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </HeroUIProvider>
  );
}
