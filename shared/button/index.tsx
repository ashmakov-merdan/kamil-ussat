'use client'
import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";
import variants from "./variant";
import { cn } from "@/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {
  className?: string
  loading?: boolean
  label?: string
  onClick: () => void
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  loading,
  label = "Default",
  onClick,
  ...args
}, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(variants({ variant, className }))}
      {...args}
    >{label}</button>
  )
});

Button.displayName = "Button";

export default Button;