import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iconic Infra Group",
  description: "Iconic Infra Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full bg-orange-50 m-0 p-0")}>
        <ClientLayout>
          <Header />
          <main>{children}</main>
          <Footer />
          <div className="fixed bottom-3 right-3 md:hidden z-10">
            <Button className="md:bottom-20 md:right-20 p-2 md:p-5 h-10 w-10 md:h-18 md:w-18 rounded-full bg-green-500 hover:bg-green-500/80">
              <FaWhatsapp size={24} className="md:hidden" />
            </Button>
          </div>
          <div className="fixed hidden bottom-20 right-20 md:block z-10">
            <Button
              className="md:bottom-20 md:right-20 md:p-2 h-18 w-18 rounded-full bg-green-500 hover:bg-green-500/80"
              asChild
            >
              <Link href="#">
                <FaWhatsapp size={32} className="hidden md:block" />
              </Link>
            </Button>
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
