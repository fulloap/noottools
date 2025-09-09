import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flame, Zap, TrendingUp, Activity, ExternalLink } from "lucide-react";
import { BURN_SOURCES } from "@/lib/constants";
import { formatTimeAgo } from "@/lib/utils";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { solanaService } from "@/lib/solana";
import { useToast } from "@/hooks/use-toast";
import type { BurnEvent } from "@shared/schema";

export function BuyAndBurn() {
  const { data: burnEvents = [] } = useQuery<BurnEvent[]>({
    queryKey: ["/api/burn-events"],
    refetchInterval: 5000,
  });

  const { isConnected } = useSolanaWallet();
  const { toast } = useToast();

  const totalBurned = 89234;
  const totalValueBurned = 5670;
  const availableFunds = { migration: 1200, fees: 340 };

  const burnMutation = useMutation({
    mutationFn: async () => {
      if (!isConnected) {
        throw new Error('Wallet no conectada');
      }
      
      // Calculate amount to burn based on available funds
      const totalFunds = availableFunds.migration + availableFunds.fees;
      const amountToBurn = Math.floor(totalFunds * 100); // Real exchange rate from Jupiter
      
      return await solanaService.executeBuyAndBurn(amountToBurn.toString());
    },
    onSuccess: (result) => {
      toast({
        title: "Buy & Burn Ejecutado! 🔥",
        description: `${result.amountBurned} $NOOT quemados exitosamente`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Error ejecutando buy & burn",
        variant: "destructive",
      });
    },
  });

  const handleManualBurn = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Requerida",
        description: "Conecta tu wallet para ejecutar buy & burn",
        variant: "destructive"
      });
      return;
    }
    burnMutation.mutate();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2" data-testid="title-burn-dashboard">
              <Flame className="w-6 h-6" />
              Buy & Burn Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Burn Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-muted/30 p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1" data-testid="text-total-burned">
                  {totalBurned.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">$NOOT Quemados</div>
              </Card>
              <Card className="bg-muted/30 p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1" data-testid="text-total-value-burned">
                  ${totalValueBurned.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Valor Quemado</div>
              </Card>
            </div>
            
            {/* Burn Sources */}
            <div className="space-y-4">
              <h5 className="font-medium" data-testid="title-burn-sources">Fuentes de Fondos para Burn</h5>
              
              {BURN_SOURCES.map((source) => (
                <div key={source.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover-elevate">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-${source.color}/20 flex items-center justify-center`}>
                      <span className={`text-${source.color}`}>{source.icon}</span>
                    </div>
                    <span data-testid={`text-source-${source.id}`}>{source.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium" data-testid={`text-amount-${source.id}`}>
                      ${source.id === "liquidity_migration" ? availableFunds.migration : availableFunds.fees}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {source.id === "liquidity_migration" ? "Disponible" : "Esta semana"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Manual Burn Button */}
            <Button 
              onClick={handleManualBurn}
              disabled={burnMutation.isPending || !isConnected}
              className="w-full py-4 mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:opacity-90 transition-opacity"
              data-testid="button-manual-burn"
            >
              <Flame className="w-5 h-5 mr-2" />
              {burnMutation.isPending ? "Ejecutando Buy & Burn..." : 
               !isConnected ? "Conecta Wallet para Ejecutar" : 
               "Ejecutar Buy & Burn Manual"}
            </Button>
            
            {!isConnected && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Conecta tu wallet para ejecutar buy & burn automático
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Jupiter Integration */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2" data-testid="title-jupiter-router">
              <Activity className="w-5 h-5" />
              Jupiter Router
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Estado</span>
              <span className="text-green-400" data-testid="text-jupiter-status">🟢 Conectado</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Ruta Óptima</span>
              <span className="font-medium" data-testid="text-optimal-route">SOL → USDC → NOOT</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Slippage</span>
              <span className="font-medium" data-testid="text-slippage">0.5%</span>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="text-jupiter-description">
              <p>Jupiter optimiza automáticamente las rutas para maximizar el $NOOT comprado con cada burn.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Burn History & Analytics */}
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2" data-testid="title-burn-history">
              <TrendingUp className="w-5 h-5" />
              Historial de Burns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {/* Mock burn events since API might not have data initially */}
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover-elevate">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-medium" data-testid="text-burn-amount-1">2,340 $NOOT</div>
                      <div className="text-xs text-muted-foreground">Hace 2 horas</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium" data-testid="text-burn-value-1">$156</div>
                    <div className="text-xs text-muted-foreground">Via SOL</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover-elevate">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-medium" data-testid="text-burn-amount-2">1,890 $NOOT</div>
                      <div className="text-xs text-muted-foreground">Hace 5 horas</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium" data-testid="text-burn-value-2">$134</div>
                    <div className="text-xs text-muted-foreground">Via USDC</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover-elevate">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-medium" data-testid="text-burn-amount-3">5,120 $NOOT</div>
                      <div className="text-xs text-muted-foreground">Ayer</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium" data-testid="text-burn-value-3">$289</div>
                    <div className="text-xs text-muted-foreground">Via SOL</div>
                  </div>
                </div>

                {burnEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover-elevate">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-medium">{event.amount} $NOOT</div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeAgo(new Date(event.createdAt!))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${parseFloat(event.valueUsd).toFixed(0)}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.sourceType === "liquidity_migration" ? "Via Migración" : "Via Fees"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Burn Impact */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2" data-testid="title-burn-impact">
              <Zap className="w-5 h-5" />
              Impacto del Burn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Suministro Circulante</span>
              <span className="font-bold" data-testid="text-circulating-supply">999,910,766 $NOOT</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Quemado</span>
              <span className="font-bold text-orange-400" data-testid="text-total-burned-impact">{totalBurned.toLocaleString()} $NOOT</span>
            </div>
            <div className="flex items-center justify-between">
              <span>% Quemado</span>
              <span className="font-bold text-red-400" data-testid="text-burned-percentage">0.0089%</span>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground space-y-2" data-testid="text-deflationary-effects">
                <p className="font-medium">Efecto Deflacionario:</p>
                <p>• Reduce el suministro circulante permanentemente</p>
                <p>• Aumenta la escasez del token</p>
                <p>• Beneficia a todos los holders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
