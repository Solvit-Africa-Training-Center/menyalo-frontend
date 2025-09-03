import type React from 'react';

export interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}
