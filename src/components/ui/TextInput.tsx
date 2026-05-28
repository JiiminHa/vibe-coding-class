import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({ label, id, className = '', ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-bold tracking-[0.12em] uppercase text-black"
      >
        {label}
      </label>
      <input
        id={id}
        className={`
          border-[1.5px] border-black bg-white px-4 py-2.5
          text-sm text-black placeholder:text-[#999]
          focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:ring-offset-0
          min-h-[44px] rounded-none
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
