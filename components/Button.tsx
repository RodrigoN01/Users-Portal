import { LucideIcon } from "lucide-react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger";
  disabled?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  icon: Icon,
  children,
}: ButtonProps) {
  const baseClasses =
    "flex items-center gap-2 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer";

  const variantClasses = {
    primary: "bg-gray-800 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {Icon && <Icon className='w-5 h-5' />}
      {children}
    </button>
  );
}
