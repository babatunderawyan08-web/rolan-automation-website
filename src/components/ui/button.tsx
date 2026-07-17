import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-secondary text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90 hover:shadow-xl hover:-translate-y-0.5",
        outline: "border border-border bg-transparent hover:bg-background-alt hover:border-secondary/50",
        ghost: "hover:bg-background-alt",
        accent: "bg-gradient-to-r from-secondary to-accent text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        success: "bg-success text-white hover:bg-success/90",
      },
      size: {
        default: "h-11 min-h-11 px-6 py-2",
        sm: "h-10 min-h-10 px-4 text-xs sm:h-9",
        lg: "h-12 min-h-12 px-8 text-base sm:h-13",
        icon: "h-11 w-11 min-h-11 min-w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
