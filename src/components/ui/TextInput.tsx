import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({ label, id, className = '', ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-primary">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-[12px] border border-hairline bg-white px-4 py-2.5 text-sm text-primary placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-brand-pink/40 min-h-[44px] ${className}`}
        {...props}
      />
    </div>
  );
}
