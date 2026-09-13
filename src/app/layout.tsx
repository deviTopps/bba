import type { Metadata } from "next";
import "bootstrap-icons/font/bootstrap-icons.css";
import { aspiraWide, elvonGrotesk, praktika } from "./fonts";
import "./globals.css";
import "./sections.css";

export const metadata: Metadata = {
  title: "Bernard Bempong & Associates | Transforming Africa. Redefining Excellence.",
  description:
    "Audit, tax, public financial management and ERP from Accra, for Ghanaian institutions and African enterprises that need evidence they can inspect and systems that go live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${elvonGrotesk.variable} ${praktika.variable} ${aspiraWide.variable} ${aspiraWide.className}`}
        suppressHydrationWarning
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
