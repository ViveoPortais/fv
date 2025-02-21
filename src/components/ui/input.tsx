import * as React from "react";
import { cn } from "@/lib/utils";
import {
  MdInfo,
  MdOutlineEmail,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { CiLock, CiLogin } from "react-icons/ci";
import { InputLoading } from "../custom/InputLoading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: "email" | "password" | "login";
  isLoading?: boolean;
  maxLength?: number;
  tooltip?: boolean;
  textTooltip?: string;
}

const iconsMap = {
  email: <MdOutlineEmail size={20} />,
  password: <CiLock size={20} />,
  login: <CiLogin size={20} />
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon,
      isLoading,
      maxLength,
      tooltip,
      textTooltip,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    if (isLoading) return <InputLoading />;

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn("w-full", className)}>
        <div className="flex gap-1 mb-1">
          <label className=" text-sm font-semibold uppercase tracking-wide text-[#919191]">
            {props.placeholder}
          </label>
          {tooltip && (
            <div className="flex items-center text-gray-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger disabled>
                    <MdInfo size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{textTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex items-center gap-2 h-10 w-full rounded-lg border border-input bg-background px-3 py-6 md:px-4 md:py-8 text-sm md:text-base ring-offset-background",
            className
          )}
        >
          {icon && iconsMap[icon as keyof typeof iconsMap]}
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            className={cn(
              "w-full p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              type === "file"
                ? "file:border-0 file:bg-transparent file:text-sm file:md:text-base file:font-medium"
                : "placeholder:text-muted-foreground"
            )}
            ref={ref}
            {...props}
            maxLength={type === "text" ? maxLength : undefined}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
