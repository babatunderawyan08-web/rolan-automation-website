import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center gradient-mesh">
      <div className="text-center px-4">
        <p className="font-heading text-8xl font-bold gradient-text">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="accent" asChild>
            <Link href="/"><Home className="h-4 w-4" /> Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact"><ArrowLeft className="h-4 w-4" /> Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
