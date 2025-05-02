import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/font";
import "@/styles/globals.css";
import "@/styles/index.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = { ...siteConfig };

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body  suppressHydrationWarning={true}
      className={cn(
        "bg-background font-sans antialiased",
        activeThemeValue ? `theme-${activeThemeValue}` : "",
        isScaled ? "theme-scaled" : "",
        fontVariables
      )}
      >
        <NextTopLoader color="hsl(var(--primary))" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
