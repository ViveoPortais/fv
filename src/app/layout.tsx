import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import ReduxProvider from "@/components/redux/ReduxProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Programa FV",
  description: "Programa FV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ReduxProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
