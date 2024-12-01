import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LoadingProvider } from "./providers/LoadingProvider";
import cn from "classnames";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My ChatBot",
  description: "Chatbot APP for PDF content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`, "w-[100vw] h-[100vh] relative dark bg-slate-900, bg-stone-900")}
      >
         <Theme className="h-full w-full">
            <LoadingProvider>
              <div className="h-full max-h-screen flex flex-col p-12">
                <div className="flex-grow overflow-y-auto">{children}</div>
              </div>
            </LoadingProvider>
          </Theme>
      </body>
    </html>
  );
}
