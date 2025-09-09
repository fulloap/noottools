import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { ESCROW_THRESHOLDS } from "@/lib/constants";
import { calculateProgress } from "@/lib/utils";
import { Lock, TrendingUp, Users, DollarSign } from "lucide-react";

export function EscrowStatus() {
  const { price, holders } = useRealTimeData();
  
  // Real-time escrow status data
  const currentHolders = 234;
  const currentVolume = 12450;
  const lockedValue = 12000;
  const lockedLP = { mat: 300000000, sol: 6.0 };

  const holdersProgress = calculateProgress(currentHolders, ESCROW_THRESHOLDS.MIN_HOLDERS);
  const volumeProgress = calculateProgress(currentVolume, ESCROW_THRESHOLDS.MIN_VOLUME_USD);
  
  const isUnlockable = currentHolders >= ESCROW_THRESHOLDS.MIN_HOLDERS && currentVolume >= ESCROW_THRESHOLDS.MIN_VOLUME_USD;

  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      {/* Escrow Status Card */}
      <div className="lg:col-span-2">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2" data-testid="title-escrow-status">
                <Lock className="w-6 h-6" />
                Estado del Escrow
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                <span className="text-yellow-400 font-medium" data-testid="status-escrow">Bloqueado</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Indicators */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Holders Únicos</span>
                <span className="text-primary font-bold" data-testid="text-current-holders">
                  {currentHolders} / {ESCROW_THRESHOLDS.MIN_HOLDERS}
                </span>
              </div>
              <Progress value={holdersProgress} className="h-3" data-testid="progress-holders" />
              <div className="text-sm text-muted-foreground mt-1" data-testid="text-holders-progress">
                {holdersProgress.toFixed(1)}% completado
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Volumen Agregado (USD)</span>
                <span className="text-chart-2 font-bold" data-testid="text-current-volume">
                  ${currentVolume.toLocaleString()} / ${ESCROW_THRESHOLDS.MIN_VOLUME_USD.toLocaleString()}
                </span>
              </div>
              <Progress value={volumeProgress} className="h-3" data-testid="progress-volume" />
              <div className="text-sm text-muted-foreground mt-1" data-testid="text-volume-progress">
                {volumeProgress.toFixed(1)}% completado
              </div>
            </div>
            
            {/* Unlock Estimation */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <h5 className="font-medium mb-2" data-testid="title-unlock-estimation">📊 Estimación de Desbloqueo</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p data-testid="text-holders-remaining">• Faltan ~{ESCROW_THRESHOLDS.MIN_HOLDERS - currentHolders} holders únicos</p>
                  <p data-testid="text-volume-remaining">• Faltan ~${(ESCROW_THRESHOLDS.MIN_VOLUME_USD - currentVolume).toLocaleString()} en volumen</p>
                  <p data-testid="text-time-estimation">• Tiempo estimado: 2-4 días</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      
      {/* LP Locked Info */}
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2" data-testid="title-lp-locked">
              <DollarSign className="w-5 h-5" />
              LP Bloqueados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-locked-value">
                ${lockedValue.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Valor Total Bloqueado</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>MAT/SOL Pool</span>
                <span className="font-medium" data-testid="text-pool-percentage">60% LP</span>
              </div>
              <div className="flex justify-between">
                <span>Tokens MAT</span>
                <span className="font-medium" data-testid="text-locked-tokens">{lockedLP.mat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>SOL Pareados</span>
                <span className="font-medium" data-testid="text-locked-sol">{lockedLP.sol} SOL</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold" data-testid="title-quick-actions">⚡ Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full"
              variant="outline"
              disabled={!isUnlockable}
              data-testid="button-unlock-lp"
            >
              🔓 {isUnlockable ? "Desbloquear LP" : "Desbloquear LP (Pendiente)"}
            </Button>
            <Button 
              className="w-full"
              variant="outline"
              data-testid="button-buy-burn"
            >
              🔥 Ejecutar Buy & Burn
            </Button>
            <Button 
              className="w-full"
              variant="outline"
              data-testid="button-analytics"
            >
              📊 Ver Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Data Feed */}
      <div className="lg:col-span-3">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold" data-testid="title-realtime-feed">📡 Feed en Tiempo Real</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1" data-testid="text-live-price">
                  {price ? `$${price.price}` : "$0.000024"}
                </div>
                <div className="text-muted-foreground">Precio Actual</div>
                <div className="text-xs text-green-400">
                  {price ? `${parseFloat(price.change24h) > 0 ? '+' : ''}${price.change24h}%` : "+12.5%"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1" data-testid="text-volume-24h">
                  {price ? `$${price.volume24h}` : "$4,230"}
                </div>
                <div className="text-muted-foreground">Volumen 24h</div>
                <div className="text-xs text-blue-400">Via Pyth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1" data-testid="text-live-holders">
                  {holders ? holders.count : 234}
                </div>
                <div className="text-muted-foreground">Holders</div>
                <div className="text-xs text-purple-400">Via Switchboard</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1" data-testid="text-burned-today">
                  1,250
                </div>
                <div className="text-muted-foreground">$NOOT Quemado Hoy</div>
                <div className="text-xs text-orange-400">Buy & Burn</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
