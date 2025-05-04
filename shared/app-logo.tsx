import { cn } from "@/lib/utils";
import { SnailIcon } from "lucide-react";
import { forwardRef } from "react";

type AppLogoProps = {
  className: string;
};

const AppLogo = forwardRef<HTMLAnchorElement, AppLogoProps>(
  ({ className, ...props }, ref) => {
    return (
      <SnailIcon
        strokeWidth={3} absoluteStrokeWidth
        className={cn(
          "group-hover:scale-110",
          "text-primary",
          className
        )}
        {...props}
      />
    );
  }
);

AppLogo.displayName = "AppLogo";

export { AppLogo };
