import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { formatNumber, formatCurrency } from "@/lib/utils";
import type { Stats } from "@shared/schema";

export function StatsOverview() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    refetchInterval: 10000, // Update every 10 seconds
  });

  if (isLoading || !stats) {
    return (
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glass-card p-6 text-center animate-pulse">
            <div className="h-8 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted/50 rounded"></div>
          </Card>
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      <Card className="glass-card p-6 text-center hover-elevate">
        <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-total-tokens">
          {formatNumber(stats.totalTokensCreated)}
        </div>
        <div className="text-muted-foreground">Tokens Creados</div>
      </Card>
      
      <Card className="glass-card p-6 text-center hover-elevate">
        <div className="text-3xl font-bold text-chart-2 mb-2" data-testid="stat-total-volume">
          {formatCurrency(parseFloat(stats.totalVolume))}
        </div>
        <div className="text-muted-foreground">Volumen Total</div>
      </Card>
      
      <Card className="glass-card p-6 text-center hover-elevate">
        <div className="text-3xl font-bold text-chart-3 mb-2" data-testid="stat-total-burned">
          {formatNumber(stats.totalBurned)}
        </div>
        <div className="text-muted-foreground">$NOOT Quemados</div>
      </Card>
      
      <Card className="glass-card p-6 text-center hover-elevate">
        <div className="text-3xl font-bold text-chart-4 mb-2" data-testid="stat-total-holders">
          {formatNumber(stats.totalHolders)}
        </div>
        <div className="text-muted-foreground">Holders Totales</div>
      </Card>
    </section>
  );
}
