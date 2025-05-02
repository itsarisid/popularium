import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/theme/theme-provider";
import "@/styles/globals.css";
import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Popularium",
  description: "New generation of Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* <NextTopLoader color="hsl(var(--primary))" /> */}
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
