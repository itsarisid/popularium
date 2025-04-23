import { cn } from "@/lib/utils";
import { Egg } from "lucide-react";
import { forwardRef } from "react";

type AppLogoProps = {
  className: string;
};

const AppLogo = forwardRef<HTMLAnchorElement, AppLogoProps>(
  ({ className, ...props },ref) => {
    return (
      <Egg 
      strokeWidth={3} absoluteStrokeWidth
        className={cn(
          "group-hover:scale-110",
          className
        )}
        {...props}
      />
    );
  }
);

AppLogo.displayName = "AppLogo";

export { AppLogo };
