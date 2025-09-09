import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Book, Code, Shield, Zap, ExternalLink, Copy } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

export default function DocsPage() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: "El código ha sido copiado exitosamente",
    });
  };

  const handleNavigate = (section: string) => {
    console.log("Navigate to:", section);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text" data-testid="text-docs-title">
            Documentación NootTools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-docs-subtitle">
            Guía completa para crear tokens SPL Token-2022, pools de liquidez y sistemas de buy-and-burn en Solana
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Contenido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <nav className="space-y-2">
                    <a href="#getting-started" className="block py-2 px-3 rounded hover:bg-muted transition-colors">
                      Primeros Pasos
                    </a>
                    <a href="#token-creation" className="block py-2 px-3 rounded hover:bg-muted transition-colors">
                      Creación de Tokens
                    </a>
                    <a href="#liquidity-pools" className="block py-2 px-3 rounded hover:bg-muted transition-colors">
                      Pools de Liquidez
                    </a>
                    <a href="#escrow-system" className="block py-2 px-3 rounded hover:bg-muted transition-colors">
                      Sistema de Escrow
                    </a>
                    <a href="#buy-burn" className="block py-2 px-3 rounded hover:bg-muted transition-colors">
                      Buy & Burn
                    </a>
                    <a href="#anti-sniper" className="block py-2 px-3 rounded hover:bg-muted transition-colors">
                      Anti-Sniper Protection
                    </a>
                    <a href="#api-reference" className="block py-2 px-3 rounded hover:bg-muted transition-colors">
                      Referencia API
                    </a>
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            <section id="getting-started">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Primeros Pasos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    NootTools es una plataforma completa para el lanzamiento de tokens en Solana con características avanzadas como anti-sniper protection, escrow automático y buy-and-burn integrado.
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Requisitos Previos</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Wallet de Solana (Phantom, Solflare, o Backpack)</li>
                      <li>SOL para fees de transacción (~0.01-0.05 SOL)</li>
                      <li>Comprensión básica de tokens SPL</li>
                    </ul>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Características Principales
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Badge variant="secondary">SPL Token-2022</Badge>
                      <Badge variant="secondary">Anti-Sniper Protection</Badge>
                      <Badge variant="secondary">Escrow Automático</Badge>
                      <Badge variant="secondary">Buy & Burn</Badge>
                      <Badge variant="secondary">Integración AMM</Badge>
                      <Badge variant="secondary">Jupiter Swaps</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Token Creation */}
            <section id="token-creation">
              <Card>
                <CardHeader>
                  <CardTitle>Creación de Tokens SPL Token-2022</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Crea tokens con características avanzadas usando el estándar SPL Token-2022 con protección anti-sniper integrada.
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Parámetros de Token</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        <code>{`{
  "name": "Mi Token Awesome",
  "symbol": "MAT",
  "decimals": 9,
  "totalSupply": "1000000000",
  "antiSniperEnabled": true,
  "transferHook": true
}`}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => copyToClipboard(`{
  "name": "Mi Token Awesome",
  "symbol": "MAT", 
  "decimals": 9,
  "totalSupply": "1000000000",
  "antiSniperEnabled": true,
  "transferHook": true
}`)}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Costos Estimados</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Creación de Token: ~0.01 SOL</li>
                      <li>Metadata Program: ~0.005 SOL</li>
                      <li>Transfer Hook Program: ~0.002 SOL</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Liquidity Pools */}
            <section id="liquidity-pools">
              <Card>
                <CardHeader>
                  <CardTitle>Pools de Liquidez</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Crea pools de liquidez en Raydium u Orca con escrow automático del 60% de LP tokens.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Raydium Integration</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>CLMM Pools (Concentrated Liquidity)</li>
                        <li>Standard AMM Pools</li>
                        <li>Farm Integration</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Orca Integration</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Whirlpools</li>
                        <li>Standard Pools</li>
                        <li>Aquafarm Integration</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-semibold">Escrow Automático</h4>
                    <p className="text-sm text-muted-foreground">
                      60% de los LP tokens se bloquean automáticamente hasta cumplir:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>500+ holders únicos</li>
                      <li>$25,000+ en volumen de trading</li>
                      <li>30 días desde la creación</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Anti-Sniper Protection */}
            <section id="anti-sniper">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Anti-Sniper Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Protección automática contra bots y snipers durante los primeros 30 segundos del lanzamiento.
                  </p>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Características de Protección</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Límite de compra por wallet (max 1% del supply)</li>
                      <li>Cooldown entre transacciones (5 segundos)</li>
                      <li>Blacklist automática de bots conocidos</li>
                      <li>Validación de slippage máximo</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">Importante</h4>
                    <p className="text-sm text-muted-foreground">
                      La protección anti-sniper se desactiva automáticamente después de 30 segundos para permitir trading normal.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api-reference">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Referencia API
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Endpoints principales para integrar con NootTools programáticamente.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">POST /api/tokens</h4>
                        <Badge variant="outline">Crear Token</Badge>
                      </div>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`curl -X POST https://noottools.com/api/tokens \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Mi Token",
    "symbol": "MTK", 
    "decimals": 9,
    "totalSupply": "1000000000"
  }'`}</code>
                      </pre>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">POST /api/pools</h4>
                        <Badge variant="outline">Crear Pool</Badge>
                      </div>
                      <pre className="text-xs overflow-x-auto">
                        <code>{`curl -X POST https://noottools.com/api/pools \\
  -H "Content-Type: application/json" \\
  -d '{
    "tokenMint": "...",
    "quoteMint": "So11111111111111111111111111111111111111112",
    "amm": "raydium"
  }'`}</code>
                      </pre>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Documentación Completa de API
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}