import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, ExternalLink, Shield, Zap, DollarSign } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function FAQPage() {
  const handleNavigate = (section: string) => {
    console.log("Navigate to:", section);
  };

  const faqCategories = [
    {
      title: "General",
      icon: HelpCircle,
      color: "blue",
      items: [
        {
          question: "¿Qué es NootTools?",
          answer: "NootTools es una plataforma completa para el lanzamiento de tokens en Solana. Permite crear tokens SPL Token-2022 con características avanzadas como anti-sniper protection, escrow automático de liquidez y sistema de buy-and-burn integrado."
        },
        {
          question: "¿Por qué usar SPL Token-2022 en lugar del estándar SPL Token?",
          answer: "SPL Token-2022 es la nueva generación de tokens en Solana que incluye características avanzadas como Transfer Hooks, que nos permiten implementar protección anti-sniper y otras funcionalidades de seguridad que no son posibles con el estándar SPL Token original."
        },
        {
          question: "¿En qué redes funciona NootTools?",
          answer: "NootTools funciona en Solana Mainnet y Devnet. Para testing y desarrollo, recomendamos usar Devnet. Para tokens de producción, usa Mainnet."
        },
        {
          question: "¿Necesito conocimientos técnicos para usar NootTools?",
          answer: "No necesitas conocimientos técnicos avanzados. La interfaz está diseñada para ser intuitiva. Solo necesitas una wallet de Solana (como Phantom) y SOL para cubrir las fees de transacción."
        }
      ]
    },
    {
      title: "Seguridad",
      icon: Shield,
      color: "green",
      items: [
        {
          question: "¿Cómo funciona la protección anti-sniper?",
          answer: "La protección anti-sniper utiliza Transfer Hooks de SPL Token-2022 para limitar las compras durante los primeros 30 segundos del lanzamiento. Esto incluye límites por wallet (máximo 1% del supply), cooldown entre transacciones y blacklist automática de bots conocidos."
        },
        {
          question: "¿Es seguro usar NootTools?",
          answer: "Sí, NootTools ha sido auditado por múltiples firmas de seguridad. No custodiamos tus fondos - todas las operaciones se ejecutan directamente desde tu wallet. El código es open source y puede ser verificado en GitHub."
        },
        {
          question: "¿Qué pasa si pierdo acceso a mi wallet?",
          answer: "NootTools no custodiza fondos, por lo que no podemos recuperar tokens si pierdes acceso a tu wallet. Asegúrate de respaldar tu frase semilla (seed phrase) de forma segura."
        },
        {
          question: "¿Cómo protegen contra rug pulls?",
          answer: "El sistema de escrow automático bloquea 60% de los LP tokens hasta que se cumplan condiciones específicas: 500+ holders únicos, $25,000+ en volumen de trading, y 30 días desde la creación. Esto reduce significativamente el riesgo de rug pulls."
        }
      ]
    },
    {
      title: "Costos y Fees",
      icon: DollarSign,
      color: "yellow",
      items: [
        {
          question: "¿Cuánto cuesta crear un token?",
          answer: "Crear un token cuesta aproximadamente 0.01-0.015 SOL, que incluye: creación del token (~0.01 SOL), metadata program (~0.005 SOL), y transfer hook program (~0.002 SOL). Los costos exactos dependen de la congestión de la red."
        },
        {
          question: "¿Cuánto cuesta crear un pool de liquidez?",
          answer: "Crear un pool de liquidez cuesta aproximadamente 0.05 SOL, más los tokens que vas a depositar en el pool. Este costo incluye la creación del pool en el AMM elegido (Raydium u Orca) y la configuración del escrow automático."
        },
        {
          question: "¿Hay fees adicionales por usar la plataforma?",
          answer: "No cobramos fees adicionales por usar NootTools. Solo pagas las fees de red de Solana. Nuestro modelo de negocio se basa en el buy-and-burn del token $NOOT con una pequeña parte de la liquidez migrada."
        },
        {
          question: "¿Cómo funciona el sistema de buy-and-burn?",
          answer: "Automáticamente usamos 5% de la liquidez migrada y fees de trading para comprar y quemar tokens $NOOT. Esto crea presión de compra constante y reduce el supply circulante del token $NOOT."
        }
      ]
    },
    {
      title: "Técnico",
      icon: Zap,
      color: "purple",
      items: [
        {
          question: "¿Qué wallets son compatibles?",
          answer: "NootTools es compatible con todas las wallets principales de Solana: Phantom, Solflare, Backpack, Glow, y cualquier wallet que soporte WalletConnect. Recomendamos Phantom para la mejor experiencia."
        },
        {
          question: "¿Puedo integrar NootTools en mi aplicación?",
          answer: "Sí, ofrecemos una API RESTful completa y SDKs para JavaScript/TypeScript, Rust y Python. Consulta nuestra documentación de API para más detalles sobre la integración."
        },
        {
          question: "¿Qué AMMs están soportados?",
          answer: "Actualmente soportamos Raydium (CLMM y Standard) y Orca (Whirlpools y Standard). Estamos trabajando en agregar más AMMs según la demanda de la comunidad."
        },
        {
          question: "¿Puedo modificar los parámetros después de crear el token?",
          answer: "Algunos parámetros como el nombre y símbolo no se pueden modificar después de la creación. Sin embargo, ciertas configuraciones como la protección anti-sniper pueden ser ajustadas por el owner del token."
        },
        {
          question: "¿Qué pasa si falla una transacción?",
          answer: "Si una transacción falla, no se ejecutará ningún cambio en la blockchain y conservarás tus fondos. Las razones comunes incluyen fondos insuficientes para fees, slippage excesivo, o congestión de red. Siempre puedes reintentar."
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      green: "text-green-400 bg-green-500/10 border-green-500/30", 
      yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text" data-testid="text-faq-title">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-faq-subtitle">
            Encuentra respuestas a las preguntas más comunes sobre NootTools
          </p>
        </div>

        {/* Quick Support */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2">¿No encuentras lo que buscas?</h3>
                <p className="text-sm text-muted-foreground">
                  Únete a nuestra comunidad para obtener ayuda directa de nuestro equipo y otros usuarios
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIdx) => (
            <Card key={categoryIdx}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${getColorClasses(category.color)}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  {category.title}
                  <Badge variant="secondary" className="ml-2">
                    {category.items.length} preguntas
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <AccordionItem 
                      key={itemIdx} 
                      value={`${categoryIdx}-${itemIdx}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Help */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recursos Adicionales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="font-semibold mb-2">Documentación</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Guías técnicas detalladas y tutoriales paso a paso
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Ver Docs
                </Button>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-semibold mb-2">API Reference</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Integra NootTools en tus aplicaciones
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Ver API
                </Button>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-2">Soporte Directo</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Contacta directamente con nuestro equipo
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Contactar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Suggestion */}
        <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">¿Aún tienes preguntas?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Usa Ctrl+F (Cmd+F en Mac) para buscar palabras clave en esta página, 
            o únete a nuestra comunidad para obtener ayuda personalizada.
          </p>
          <div className="flex justify-center space-x-3">
            <Button variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Unirse a Discord
            </Button>
            <Button>
              Contactar Soporte
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}