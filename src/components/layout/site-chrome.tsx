"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { AiChatbot } from "@/components/layout/ai-chatbot";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { CustomCursor } from "@/components/layout/custom-cursor";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname.startsWith("/demo");
  const isMrRolan = pathname === "/mrrolan";

  if (isDemo || isMrRolan) {
    return (
      <>
        <CustomCursor />
        {children}
      </>
    );
  }

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0">{children}</main>
      <Footer />
      <FloatingActions />
      <AiChatbot />
      <CookieBanner />
    </>
  );
}
