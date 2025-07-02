// components/ClientLayout.tsx
"use client";

import { Inter } from "next/font/google";
import Appbar1 from "@/components/Appbar1";
import Appbar2 from "@/components/Appbar2";
import Footer from "@/components/Footer";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <RecoilRoot>
      <div className={inter.className}>
        <Appbar1 />
        <Appbar2 />
        <div className="mt-24">
          {children}
        </div>
        <Footer />
      </div>
    </RecoilRoot>
  );
}
