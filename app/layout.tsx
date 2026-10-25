import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "ARWATS 2027 – Call for Papers",
  description:
    "Africa RWA & Tokenization Summit, Accra, Ghana, February 2027. Submit your abstract.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="bg-white font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
