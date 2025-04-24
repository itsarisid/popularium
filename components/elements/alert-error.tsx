import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AlertErrorProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
}

export function AlertError({
  className,
  message,
  title,
  ...props
}: AlertErrorProps) {
  return (
    <Alert className={cn("border-red-600", className)} {...props}>
      <Terminal className="h-4 w-4 text-forgraound-red-600" />
      <AlertTitle className="text-red-500">{title}</AlertTitle>
      <AlertDescription className="text-red-300">{message}</AlertDescription>
    </Alert>
  );
}
