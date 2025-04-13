import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import NavBar from "@/components/NavBar";
import { FooterPage } from "@/components/PageFooter";
import "@/styles/globals.css";
import "@/public/assets/fonts/magistral.css";
import Script from "next/script";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ASB Studio",
  description: "Диджитал агенство ASB Studio"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          min-h-screen
          h-full
          flex
          flex-col
          bg-white dark:bg-dark-base
          text-dark-base dark:text-white
          ${inter.className}
        `}
      >
        <Providers>
          <NavBar />
          <main className="overflow-hidden">{children}</main>
          <FooterPage />
        </Providers>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </body>
    </html>
  );
}
