import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google'
import { cn } from "@/lib/utils";
 
const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Web Libraries",
  description: "Search for web libraries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('antialiased', poppins.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
