import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, WalletIcon } from "lucide-react";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";

interface MobileMenuProps {
  onNavigate: (section: string) => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { isConnected, isConnecting, connectWallet, disconnectWallet, getShortAddress } = useSolanaWallet();

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
            {isConnected ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium" data-testid="text-wallet-address-mobile">
                    {getShortAddress()}
                  </span>
                </div>
                <Button 
                  onClick={disconnectWallet}
                  variant="outline"
                  className="w-full"
                  data-testid="button-disconnect-wallet-mobile"
                >
                  Desconectar Wallet
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full gradient-purple text-white" 
                data-testid="button-connect-wallet"
              >
                <WalletIcon className="w-4 h-4 mr-2" />
                {isConnecting ? 'Conectando...' : 'Conectar Wallet'}
              </Button>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
