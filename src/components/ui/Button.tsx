import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'min-h-[44px] rounded-[12px] px-5 py-2.5 text-sm font-medium transition-opacity disabled:opacity-40';
  const variants = {
    primary: 'bg-primary text-white hover:opacity-80',
    secondary: 'border border-hairline bg-canvas text-primary hover:bg-surface-card',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
