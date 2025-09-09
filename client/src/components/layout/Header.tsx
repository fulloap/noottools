import { MobileMenu } from "@/components/ui/mobile-menu";
import { Button } from "@/components/ui/button";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { Wallet, WalletIcon } from "lucide-react";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { isConnected, isConnecting, connectWallet, disconnectWallet, getShortAddress } = useSolanaWallet();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="text-2xl font-bold text-gradient" data-testid="text-brand">NootTools</h1>
          </div>
          
          <MobileMenu onNavigate={onNavigate} />
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate("crear-token")}
              className="hover:text-primary transition-colors"
              data-testid="link-crear-token"
            >
              Crear Token
            </button>
            <button 
              onClick={() => onNavigate("crear-pool")}
              className="hover:text-primary transition-colors"
              data-testid="link-crear-pool"
            >
              Crear Pool
            </button>
            <button 
              onClick={() => onNavigate("estado")}
              className="hover:text-primary transition-colors"
              data-testid="link-estado"
            >
              Estado
            </button>
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium" data-testid="text-wallet-address">
                    {getShortAddress()}
                  </span>
                </div>
                <Button 
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  data-testid="button-disconnect-wallet"
                >
                  Desconectar
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="gradient-purple text-white font-medium hover:opacity-90 transition-opacity animate-pulse"
                data-testid="button-connect-wallet"
              >
                <WalletIcon className="w-4 h-4 mr-2" />
                {isConnecting ? 'Conectando...' : '🔗 Conectar Wallet'}
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
