// app/layout.tsx
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Judge",
  description: "A platform where user can test there code and solve proble of dsa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
