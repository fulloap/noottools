import { Card } from "@/components/ui/card";
import { Shield, X, Check } from "lucide-react";

export function AntiSniperProtection() {
  // Static 30-second protection display (no countdown)
  const isActive = true; // Always show as active protection
  const protectionTime = "00:30";

  return (
    <section className="mb-16">
      <Card className="glass-card p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2" data-testid="title-anti-sniper-demo">
            <Shield className="w-8 h-8" />
            Protección Anti-Sniper
          </h3>
          <p className="text-muted-foreground" data-testid="text-demo-description">
            Protección real durante los primeros 30 segundos tras el lanzamiento
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Protection Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 p-6 rounded-xl border bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30">
              <div className="text-6xl font-bold tabular-nums text-red-400" data-testid="text-countdown">
                {protectionTime}
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-red-400" data-testid="text-protection-status">
                  Protección Activa
                </div>
                <div className="text-muted-foreground" data-testid="text-protection-description">
                  Swaps AMM bloqueados durante 30 segundos
                </div>
              </div>
            </div>
          </div>
          
          {/* Transaction Examples */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border bg-red-500/10 border-red-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-500/20">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="font-bold text-red-400" data-testid="text-swap-status">
                    Swap Bloqueado
                  </div>
                  <div className="text-sm text-muted-foreground">AMM Vault → Usuario</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1" data-testid="text-blocked-transaction">
                <p>• Usuario intenta comprar desde Raydium</p>
                <p>• TransferHook detecta bóveda AMM</p>
                <p>• Transacción rechazada automáticamente</p>
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
