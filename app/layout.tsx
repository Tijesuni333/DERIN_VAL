import type { Metadata } from "next";
import { Dancing_Script, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Derin's val",
  description: "A special question for a special person.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${montserrat.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
