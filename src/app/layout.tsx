import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { createMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata = createMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>
      <body className="min-h-screen overflow-x-clip bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <QueryProvider>
            <LoadingScreen />
            <CustomCursor />
            <Navbar />
            <main className="pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0">{children}</main>
            <Footer />
            <FloatingActions />
            <CookieBanner />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
