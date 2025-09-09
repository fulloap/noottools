import { Card } from "@/components/ui/card";
import { useAntiSniperCountdown } from "@/hooks/useRealTimeData";
import { Shield, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function AntiSniperDemo() {
  const { timeLeft, formattedTime, isActive, isExpired } = useAntiSniperCountdown(28);

  return (
    <section className="mb-16">
      <Card className="glass-card p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2" data-testid="title-anti-sniper-demo">
            <Shield className="w-8 h-8" />
            Demo Protección Anti-Sniper
          </h3>
          <p className="text-muted-foreground" data-testid="text-demo-description">
            Simulación de los primeros 30 segundos tras el lanzamiento
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Countdown Timer */}
          <div className="text-center mb-8">
            <div className={cn(
              "inline-flex items-center space-x-4 p-6 rounded-xl border transition-all duration-500",
              isActive 
                ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30" 
                : "bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30"
            )}>
              <div className={cn(
                "text-6xl font-bold tabular-nums transition-colors duration-500",
                isActive ? "text-red-400" : "text-green-400"
              )} data-testid="text-countdown">
                {formattedTime}
              </div>
              <div className="text-left">
                <div className={cn(
                  "text-xl font-bold transition-colors duration-500",
                  isActive ? "text-red-400" : "text-green-400"
                )} data-testid="text-protection-status">
                  {isActive ? "Protección Activa" : "Protección Desactivada"}
                </div>
                <div className="text-muted-foreground" data-testid="text-protection-description">
                  {isActive ? "Swaps AMM bloqueados" : "Swaps AMM permitidos"}
                </div>
              </div>
            </div>
          </div>
          
          {/* Transaction Examples */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className={cn(
              "p-6 border transition-all duration-500",
              isActive 
                ? "bg-red-500/10 border-red-500/30" 
                : "bg-muted/20 border-border"
            )}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500",
                  isActive 
                    ? "bg-red-500/20" 
                    : "bg-muted"
                )}>
                  {isActive ? (
                    <X className="w-5 h-5 text-red-400" />
                  ) : (
                    <Check className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className={cn(
                    "font-bold transition-colors duration-500",
                    isActive ? "text-red-400" : "text-muted-foreground"
                  )} data-testid="text-swap-status">
                    {isActive ? "Swap Bloqueado" : "Swap Permitido"}
                  </div>
                  <div className="text-sm text-muted-foreground">AMM Vault → Usuario</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1" data-testid="text-blocked-transaction">
                <p>• Usuario intenta comprar desde Raydium</p>
                <p>• TransferHook detecta bóveda AMM</p>
                <p>• Transacción {isActive ? "rechazada" : "permitida"} automáticamente</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-green-500/10 border-green-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="font-bold text-green-400" data-testid="text-transfer-allowed">Transfer Permitido</div>
                  <div className="text-sm text-muted-foreground">Wallet → Wallet</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1" data-testid="text-allowed-transaction">
                <p>• Usuario transfiere a otra wallet</p>
                <p>• Sin bóvedas AMM involucradas</p>
                <p>• Transacción procesada normalmente</p>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </section>
  );
}
