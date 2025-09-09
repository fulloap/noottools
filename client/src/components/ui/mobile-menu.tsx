import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  onNavigate: (section: string) => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <nav className="flex flex-col space-y-4 mt-8">
          <button 
            onClick={() => handleNavigate("crear-token")}
            className="text-left py-3 px-4 rounded-lg hover:bg-muted transition-colors"
            data-testid="link-crear-token"
          >
            Crear Token
          </button>
          <button 
            onClick={() => handleNavigate("crear-pool")}
            className="text-left py-3 px-4 rounded-lg hover:bg-muted transition-colors"
            data-testid="link-crear-pool"
          >
            Crear Pool
          </button>
          <button 
            onClick={() => handleNavigate("estado")}
            className="text-left py-3 px-4 rounded-lg hover:bg-muted transition-colors"
            data-testid="link-estado"
          >
            Estado
          </button>
          <div className="pt-4 border-t border-border">
            <Button className="w-full gradient-purple text-white" data-testid="button-connect-wallet">
              Conectar Wallet
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
