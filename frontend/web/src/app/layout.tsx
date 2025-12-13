import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD

import { ThemeProvider } from "@/components/theme-provider";
import DottedSurface from "@/components/ui/DottedSurface";
=======
import { ThemeProvider } from "@/components/providers/theme-provider";
>>>>>>> 40f3b007f68c553469d8f4b899ed89b210563154

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Lumina - AI-Powered Learning",
    description: "Personalized learning pathways powered by AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    forcedTheme="dark"
                    disableTransitionOnChange
                >
                    {children}

                </ThemeProvider>
            </body>
        </html>
    );
}
