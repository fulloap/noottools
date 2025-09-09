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
      const connectedWallet = await solanaService.connectPhantomWallet();
      setWallet(connectedWallet);
      
      toast({
        title: "Wallet Conectada",
        description: `Phantom wallet conectada exitosamente`,
      });
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      
      if (error.message.includes('not installed')) {
        toast({
          title: "Phantom Wallet Requerida",
          description: "Por favor instala la extensión de Phantom wallet para continuar",
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