import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">FARM<span className="text-primary">2</span>HOME</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Farm2Home. Connecting your farm to every home.
          </p>
        </div>
      </div>
    </footer>
  );
}
