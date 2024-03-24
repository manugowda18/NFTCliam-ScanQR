import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomThirdwebProvider } from "./components/ThirdwebProdiver";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Code Nft",
  description: "Clim nft by Qr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomThirdwebProvider>
        {children}
        </CustomThirdwebProvider>

        </body>
    </html>
  );
}
