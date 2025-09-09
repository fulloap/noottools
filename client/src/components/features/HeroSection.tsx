import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewDocs: () => void;
}

export function HeroSection({ onGetStarted, onViewDocs }: HeroSectionProps) {
  return (
    <section className="text-center mb-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
          Lanza Tu Token en{" "}
          <span className="text-gradient">Solana</span>
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8" data-testid="text-hero-description">
          Crear pools preconfigurados, protección anti-sniper, y buy-and-burn automático. Todo on-chain, sin fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onGetStarted}
            className="px-8 py-4 text-lg gradient-purple text-white font-semibold hover:opacity-90 transition-opacity"
            data-testid="button-get-started"
          >
            Comenzar Ahora
          </Button>
          <Button 
            onClick={onViewDocs}
            variant="outline"
            className="px-8 py-4 text-lg font-semibold"
            data-testid="button-view-docs"
          >
            Ver Documentación
          </Button>
        </div>
      </div>
    </section>
  );
}
