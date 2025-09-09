import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AMM_OPTIONS, PAIR_TOKENS } from "@/lib/constants";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { solanaService } from "@/lib/solana";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PoolFormData {
  amm: string;
  pairToken: string;
  tokenAmount: string;
  pairAmount: string;
}

export function PoolCreation() {
  const [selectedAMM, setSelectedAMM] = useState("raydium");
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);
  const { isConnected } = useSolanaWallet();
  const { toast } = useToast();
  
  const form = useForm<PoolFormData>({
    defaultValues: {
      amm: "raydium",
      pairToken: "SOL",
      tokenAmount: "",
      pairAmount: "",
    },
  });

  const createPoolMutation = useMutation({
    mutationFn: async (data: PoolFormData) => {
      if (!isConnected) {
        throw new Error('Wallet no conectada');
      }
      
      // Create liquidity pool on Solana
      const poolResult = await solanaService.createLiquidityPool({
        tokenMint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", // Real token mint from previous creation
        quoteMint: data.pairToken === "SOL" ? "So11111111111111111111111111111111111111112" : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        tokenAmount: data.tokenAmount,
        quoteAmount: data.pairAmount,
        amm: data.amm as "raydium" | "orca"
      });
      
      return poolResult;
    },
    onSuccess: (result) => {
      setTransactionSignature(result.signature);
      toast({
        title: "Pool Creado Exitosamente! 🎉",
        description: `Pool de liquidez creado en ${selectedAMM.charAt(0).toUpperCase() + selectedAMM.slice(1)}`,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Hubo un problema creando el pool",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PoolFormData) => {
    if (!isConnected) {
      toast({
        title: "Wallet Requerida",
        description: "Por favor conecta tu wallet de Solana para crear pools",
        variant: "destructive"
      });
      return;
    }
    createPoolMutation.mutate(data);
  };

  const watchedValues = form.watch();
  const tokenAmount = parseFloat(watchedValues.tokenAmount || "0");
  const pairAmount = parseFloat(watchedValues.pairAmount || "0");
  const initialPrice = tokenAmount > 0 && pairAmount > 0 ? (pairAmount / tokenAmount) * (watchedValues.pairToken === "SOL" ? 200 : 1) : 0;
  const marketCap = tokenAmount > 0 ? initialPrice * 1000000000 : 0; // Assuming 1B total supply

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold" data-testid="title-create-pool">
              Crear Pool de Liquidez
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Seleccionar AMM</label>
              <div className="grid grid-cols-2 gap-4">
                {AMM_OPTIONS.map((amm) => (
                  <button
                    key={amm.id}
                    type="button"
                    onClick={() => setSelectedAMM(amm.id)}
                    className={cn(
                      "p-4 rounded-lg border-2 text-center transition-colors",
                      selectedAMM === amm.id 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary"
                    )}
                    data-testid={`button-amm-${amm.id}`}
                  >
                    <div className={cn(
                      "w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-gradient-to-r",
                      amm.gradient
                    )}>
                      <span className="text-white font-bold">{amm.logo}</span>
                    </div>
                    <div className="font-bold" data-testid={`text-amm-name-${amm.id}`}>{amm.name}</div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-amm-type-${amm.id}`}>{amm.type}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Token Base</label>
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted" data-testid="display-base-token">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-chart-2 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MAT</span>
                      </div>
                      <span className="font-medium">MAT</span>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="pairToken"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Quote</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-pair-token">
                              <SelectValue placeholder="Seleccionar token" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PAIR_TOKENS.map((token) => (
                              <SelectItem key={token.symbol} value={token.symbol}>
                                {token.symbol}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tokenAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad MAT</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="500000000" 
                            {...field}
                            data-testid="input-token-amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pairAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad {watchedValues.pairToken}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="10" 
                            {...field}
                            data-testid="input-pair-amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-3" data-testid="title-escrow-config">🔒 Configuración de Escrow</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>LP Total</span>
                        <span className="font-medium" data-testid="text-total-lp">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LP Bloqueado (Escrow)</span>
                        <span className="font-medium text-yellow-400" data-testid="text-locked-lp">60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LP Libre</span>
                        <span className="font-medium text-green-400" data-testid="text-free-lp">40%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  type="submit" 
                  className="w-full py-4 gradient-purple text-white font-semibold hover:opacity-90 transition-opacity"
                  disabled={createPoolMutation.isPending || !isConnected}
                  data-testid="button-create-pool"
                >
                  {createPoolMutation.isPending ? "Creando Pool en Blockchain..." : 
                   !isConnected ? "Conecta Wallet para Crear Pool" : 
                   "Crear Pool de Liquidez (~0.05 SOL)"}
                </Button>
                
                {!isConnected && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Necesitas conectar una wallet de Solana para crear pools
                  </p>
                )}
                
                {transactionSignature && (
                  <Card className="bg-green-500/10 border-green-500/30 mt-4">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-green-400">¡Pool Creado!</div>
                          <div className="text-sm text-muted-foreground">60% LP bloqueado automáticamente</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`https://solscan.io/tx/${transactionSignature}?cluster=devnet`, '_blank')}
                          data-testid="button-view-pool-transaction"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Ver TX
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold" data-testid="title-pool-preview">Pool Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Par</span>
              <span className="font-bold" data-testid="text-pool-pair">MAT/{watchedValues.pairToken}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>AMM</span>
              <span className="font-bold text-primary" data-testid="text-pool-amm">
                {AMM_OPTIONS.find(amm => amm.id === selectedAMM)?.name} {AMM_OPTIONS.find(amm => amm.id === selectedAMM)?.type}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Precio Inicial</span>
              <span className="font-bold" data-testid="text-initial-price">
                {initialPrice > 0 ? `$${initialPrice.toFixed(8)}` : "$0.00000000"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Market Cap</span>
              <span className="font-bold text-chart-2" data-testid="text-market-cap">
                {marketCap > 0 ? `$${marketCap.toLocaleString()}` : "$0"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold" data-testid="title-buy-burn-config">📈 Configuración Buy & Burn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>5% de Liquidez Migrada</span>
              <span className="text-green-400" data-testid="status-liquidity-migration">✓ Activado</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Comisiones de Trading</span>
              <span className="text-green-400" data-testid="status-trading-fees">✓ Redirigidas</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Jupiter Integration</span>
              <span className="text-green-400" data-testid="status-jupiter">✓ Configurado</span>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="text-burn-description">
              Todo se enrutará automáticamente al Burn Router para comprar y quemar $NOOT
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
