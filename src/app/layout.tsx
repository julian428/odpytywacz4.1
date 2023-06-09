import "./globals.css";
import MainNav from "@/layouts/main";
import { ReactNode } from "react";
import ToasterProviders from "@/providers/toast";
import { getServerSession } from "next-auth";
import SessionProvider from "@/providers/session";
import authOptions from "@/lib/auth";

export const metadata = {
  title: "Odpytywacz",
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pl">
      <SessionProvider session={session}>
        <ToasterProviders>
          <body className="bg-color0 text-white min-h-screen scroll-smooth">
            <header>
              <MainNav />
            </header>
            <main>{children}</main>
          </body>
        </ToasterProviders>
      </SessionProvider>
    </html>
  );
}
