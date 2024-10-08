import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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

export const metadata = {
  title: "MOCKMATE",
  description: "Generated by create next app",
  icons: {
    icon: "/logo2.png", // Correct path to your logo
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          style={{
            background: `radial-gradient(circle at 0% 0%, rgba(20, 44, 77, 0.545) 0%, rgba(46, 87, 180, 0.545) 25%, rgba(96, 134, 219, 0.545) 50%, rgba(210, 69, 228, 0.545) 100%)`,
            minHeight: "100vh", // Ensure the body takes up full height
          }}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
