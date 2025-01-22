"use client";

import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Kyvrixon Development ID Verification</title>

        <meta property="og:title" content="ID Verification" />
        <meta property="og:description" content="Verify your identity here" />
        <meta property="og:url" content="https://id-verify.kyvrixon.dev" />
        <meta property="og:image" content="https://api.kyvrixon.dev/ky.png" />
        <meta property="og:type" content="website" />
        <meta property="og:author" content="© 2025 Kyvrixon Development" />

        <meta name="description" content="Verify your identity here" />
        <meta name="author" content="Kyvrixon Development" />

      </head>
      <body className={inter.className}>
        <SessionProvider>
          <div>
            <div>
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}