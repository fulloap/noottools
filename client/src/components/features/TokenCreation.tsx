import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Shield, Check, ExternalLink } from "lucide-react";
import { insertTokenSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { solanaService } from "@/lib/solana";
import { cn } from "@/lib/utils";

export function TokenCreation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isConnected, wallet, publicKey } = useSolanaWallet();
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);

  // Debug logging
  console.log('TokenCreation render:', { 
    isConnected, 
    publicKey, 
    walletExists: !!wallet 
  });
  
  const form = useForm({
    resolver: zodResolver(insertTokenSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: 9,
      totalSupply: "",
    },
  });

  const createTokenMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!isConnected) {
        throw new Error('Wallet no conectada');
      }
      
      // Create token on Solana blockchain
      const tokenResult = await solanaService.createToken({
        name: data.name,
        symbol: data.symbol,
        decimals: data.decimals,
        totalSupply: data.totalSupply,
        antiSniperEnabled: true,
        transferHookEnabled: true
      });
      
      // Also save to backend for tracking
      const response = await apiRequest("POST", "/api/tokens", {
        ...data,
        mintAddress: tokenResult.mintAddress
      });
      
      return {
        ...await response.json(),
        solanaData: tokenResult
      };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setTransactionSignature(result.solanaData.signature);
      toast({
        title: "Token Creado Exitosamente! 🎉",
        description: `${result.symbol} creado en Solana con anti-sniper protection`,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Hubo un problema creando el token",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    if (!isConnected) {
      toast({
        title: "Wallet Requerida",
        description: "Por favor conecta tu wallet de Solana para crear tokens",
        variant: "destructive"
      });
      return;
    }
    createTokenMutation.mutate(data);
  };

  const watchedValues = form.watch();

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold" data-testid="title-create-token">
              Crear SPL Token-2022
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Token</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Mi Awesome Token" 
                          {...field}
                          data-testid="input-token-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Símbolo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="MAT" 
                          {...field}
                          data-testid="input-token-symbol"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="totalSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suministro Total</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="1000000000" 
                          {...field}
                          data-testid="input-total-supply"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="decimals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Decimales</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger data-testid="select-decimals">
                            <SelectValue placeholder="Seleccionar decimales" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="9">9 (Recomendado)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Card className="bg-muted/30 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className="font-medium" data-testid="text-anti-sniper-included">Protección Anti-Sniper Incluida</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-8" data-testid="text-anti-sniper-description">
                      TransferHook bloqueará swaps con AMMs durante 30 segundos tras el lanzamiento
                    </p>
                  </CardContent>
                </Card>
                
                <Button 
                  type="submit" 
                  className="w-full py-4 gradient-purple text-white font-semibold hover:opacity-90 transition-opacity"
                  disabled={createTokenMutation.isPending || !isConnected}
                  data-testid="button-create-token"
                  onClick={(e) => {
                    console.log('Button clicked - Debug info:', {
                      isConnected,
                      publicKey,
                      isPending: createTokenMutation.isPending,
                      disabled: createTokenMutation.isPending || !isConnected
                    });
                  }}
                >
                  {createTokenMutation.isPending ? "🔄 Creando en Blockchain..." : 
                   !isConnected ? "❌ Conecta Wallet para Crear" : 
                   `✅ Crear Token en Solana (${publicKey?.slice(0, 4)}...)`}
                </Button>
                
                {!isConnected && (
                  <div className="text-center mt-2 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      ⚠️ Wallet no conectada - Usa el botón "Conectar Wallet" arriba
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requiere Phantom Wallet instalada
                    </p>
                  </div>
                )}
                
                {transactionSignature && (
                  <Card className="bg-green-500/10 border-green-500/30 mt-4">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-green-400">¡Token Creado!</div>
                          <div className="text-sm text-muted-foreground">Verificar en Solscan</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`https://solscan.io/tx/${transactionSignature}?cluster=devnet`, '_blank')}
                          data-testid="button-view-transaction"
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
        {/* Token Preview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold" data-testid="title-token-preview">Vista Previa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-chart-2 flex items-center justify-center">
                <span className="text-white font-bold" data-testid="text-token-logo">
                  {watchedValues.symbol?.substring(0, 3).toUpperCase() || "TKN"}
                </span>
              </div>
              <div>
                <div className="font-bold" data-testid="text-preview-name">
                  {watchedValues.name || "Nombre del Token"}
                </div>
                <div className="text-muted-foreground" data-testid="text-preview-symbol">
                  {watchedValues.symbol?.toUpperCase() || "SYMBOL"}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <div className="text-sm text-muted-foreground">Suministro</div>
                <div className="font-bold" data-testid="text-preview-supply">
                  {watchedValues.totalSupply ? parseInt(watchedValues.totalSupply).toLocaleString() : "0"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Decimales</div>
                <div className="font-bold" data-testid="text-preview-decimals">
                  {watchedValues.decimals}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Anti-Sniper Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2" data-testid="title-anti-sniper">
              <Shield className="w-5 h-5" />
              Protección Anti-Sniper
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Estado</span>
              <span className="text-yellow-400" data-testid="text-anti-sniper-status">⏳ Preparando</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Duración</span>
              <span className="text-primary font-bold" data-testid="text-anti-sniper-duration">30 segundos</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1" data-testid="text-anti-sniper-features">
              <p>• Bloquea swaps con bóvedas AMM durante 30s</p>
              <p>• Permite transferencias wallet-a-wallet</p>
              <p>• El creador puede estar en whitelist</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
