import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Footer } from "@/components/shared/footer";
import { Navigation } from "@/components/shared/header";
import QueryProvider from "@/providers/QueryProvider";
import { CustomToaster } from "@/components/common/Toaster";
import { getSession } from "@/actions/auth.actions";
import { SessionProvider } from "@/providers/SessionProvider";

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

export const metadata: Metadata = {
  title: "Task Master",
  description: "Manage your tasks efficiently",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <QueryProvider>
              <main className="flex flex-col min-h-screen">
                <Navigation />
                <div className="flex-1 flex flex-col">{children}</div>
                <Footer />
              </main>
              <CustomToaster />
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
