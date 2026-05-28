import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary';
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'min-h-[44px] px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-opacity disabled:opacity-30 rounded-none border-[1.5px] border-black cursor-pointer';

  const variants = {
    // 검정 배경 — 기본 액션
    primary: 'bg-black text-white hover:bg-[#111]',
    // 형광 라임 — 강조 액션 (생성, 복사 등)
    accent:  'bg-[#CCFF00] text-black hover:opacity-80',
    // 흰 배경 — 보조 액션
    secondary: 'bg-white text-black hover:bg-[#F2F2F2]',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
