import { useState, useEffect, useCallback } from 'react';
import { solanaService, type SolanaWallet } from '@/lib/solana';
import { useToast } from '@/hooks/use-toast';

export function useSolanaWallet() {
  const [wallet, setWallet] = useState<SolanaWallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  // Initialize Solana connection on mount
  useEffect(() => {
    const init = async () => {
      try {
        await solanaService.initConnection();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Solana connection:', error);
        toast({
          title: "Error de Conexión",
          description: "No se pudo conectar a la red de Solana",
          variant: "destructive",
        });
      }
    };

    init();
  }, [toast]);

  // Auto-restore connection if Phantom is already connected
  useEffect(() => {
    const restoreConnection = async () => {
      if (typeof window !== 'undefined' && window.solana && isInitialized) {
        try {
          // Try silent connection (only if already trusted)
          await window.solana.connect({ onlyIfTrusted: true });
          
          if (window.solana.publicKey) {
            console.log('🔄 Auto-restoring Phantom connection:', window.solana.publicKey.toString());
            const restoredWallet: SolanaWallet = {
              publicKey: window.solana.publicKey.toString(),
              isConnected: true,
              connect: async () => {
                await window.solana!.connect();
              },
              disconnect: async () => {
                await window.solana!.disconnect();
                setWallet(null);
              },
              signTransaction: window.solana.signTransaction,
              signMessage: window.solana.signMessage
            };
            setWallet(restoredWallet);
            console.log('✅ Wallet connection restored successfully');
          }
        } catch (error) {
          // Silent fail - this is normal if wallet isn't pre-approved
          console.log('No existing wallet connection to restore');
        }
      }
    };

    restoreConnection();
  }, [isInitialized]);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (!isInitialized) {
      toast({
        title: "Error",
        description: "Conexión a Solana no inicializada",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      console.log('Attempting to connect Phantom wallet...');
      
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        throw new Error('Browser environment required');
      }

      // Check if Phantom is installed
      if (!window.solana) {
        throw new Error('Phantom wallet not installed. Please install from https://phantom.app/');
      }

      if (!window.solana.isPhantom) {
        throw new Error('Please use Phantom wallet. Other wallets are not currently supported.');
      }

      const connectedWallet = await solanaService.connectPhantomWallet();
      setWallet(connectedWallet);
      
      console.log('Wallet connected successfully:', connectedWallet.publicKey);
      
      toast({
        title: "Wallet Conectada ✅",
        description: `Phantom wallet conectada: ${connectedWallet.publicKey?.slice(0, 8)}...`,
      });
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      
      if (error.message.includes('not installed') || error.message.includes('not found')) {
        toast({
          title: "Phantom Wallet Requerida",
          description: "Instala Phantom desde https://phantom.app/ y recarga la página",
          variant: "destructive",
        });
      } else if (error.message.includes('rejected by user')) {
        toast({
          title: "Conexión Cancelada",
          description: "Debes aprobar la conexión en Phantom para continuar",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error de Conexión",
          description: error.message || "No se pudo conectar la wallet",
          variant: "destructive",
        });
      }
    } finally {
      setIsConnecting(false);
    }
  }, [isInitialized, toast]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setWallet(null);
        toast({
          title: "Wallet Desconectada",
          description: "La wallet se ha desconectado exitosamente",
        });
      } catch (error) {
        console.error('Wallet disconnection error:', error);
        toast({
          title: "Error",
          description: "Error al desconectar la wallet",
          variant: "destructive",
        });
      }
    }
  }, [wallet, toast]);

  // Check if wallet is connected
  const isConnected = wallet?.isConnected || false;

  // Get wallet address (shortened)
  const getShortAddress = useCallback(() => {
    if (!wallet?.publicKey) return '';
    const addr = wallet.publicKey;
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  }, [wallet?.publicKey]);

  return {
    wallet,
    isConnected,
    isConnecting,
    isInitialized,
    connectWallet,
    disconnectWallet,
    getShortAddress,
    publicKey: wallet?.publicKey || null
  };
}