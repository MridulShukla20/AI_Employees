import { ReactNode } from "react";
import { NewHeader } from "@/components/home/NewHeader";
import { NewFooter } from "@/components/home/NewFooter";

interface NewLayoutProps {
  children: ReactNode;
}

export function NewLayout({ children }: NewLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NewHeader />
      <main className="flex-1">{children}</main>
      <NewFooter />
    </div>
  );
}
