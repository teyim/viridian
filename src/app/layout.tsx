import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/next-auth";
import QueryClientContextProvider from "@/providers/react-query";
import { metadata as defaultMetadata } from "./metadata";

const space_Grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space_Grotesk.variable} ${poppins.variable} font-grotesk`}>
        <QueryClientContextProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}