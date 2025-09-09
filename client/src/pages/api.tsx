import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Copy, Play, ExternalLink, Key, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

export default function APIPage() {
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

  const endpoints = [
    {
      method: "POST",
      path: "/api/tokens",
      description: "Crear un nuevo token SPL Token-2022",
      parameters: {
        name: "string",
        symbol: "string", 
        decimals: "number",
        totalSupply: "string"
      },
      example: `{
  "name": "Mi Token Awesome",
  "symbol": "MAT",
  "decimals": 9,
  "totalSupply": "1000000000"
}`,
      response: `{
  "id": "token_123",
  "mintAddress": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "signature": "3Bxs7z1GPRVsviUikKzXoBGSUPt2WqpBmGy8VR5tJa2N...",
  "status": "confirmed"
}`
    },
    {
      method: "POST", 
      path: "/api/pools",
      description: "Crear pool de liquidez en AMM",
      parameters: {
        tokenMint: "string",
        quoteMint: "string",
        tokenAmount: "string",
        quoteAmount: "string",
        amm: "raydium | orca"
      },
      example: `{
  "tokenMint": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "quoteMint": "So11111111111111111111111111111111111111112",
  "tokenAmount": "1000000",
  "quoteAmount": "100",
  "amm": "raydium"
}`,
      response: `{
  "poolAddress": "4WQSYWkpKKf8VKsT9ZrE6rF7L4EKqFjt2QGZ3JHX9mT2",
  "lpMint": "8NxQdVwXzKLzFK7E3pP4RzHnzQJ9eQYKj2t5W6rN9mSp",
  "signature": "5DxQrW2ZJkLp9mKf3tVgNz1cE8bHaR5sU7vF6qYeRtPp...",
  "escrowAmount": "600000"
}`
    },
    {
      method: "POST",
      path: "/api/burn-events",
      description: "Ejecutar buy-and-burn manual",
      parameters: {
        amount: "string",
        source: "migration | fees"
      },
      example: `{
  "amount": "50000",
  "source": "migration"
}`,
      response: `{
  "signature": "2BxRqK9ZJmL5vT3gPzN8cD1eF4bHxQ2sU6vG7pYdRwSk...",
  "amountBurned": "50000",
  "route": ["SOL", "USDC", "NOOT"],
  "burnAddress": "So11111111111111111111111111111111111111112"
}`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text" data-testid="text-api-title">
            API de NootTools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-api-subtitle">
            API RESTful completa para integrar funcionalidades de lanzamiento de tokens en tus aplicaciones
          </p>
        </div>

        {/* Authentication */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Autenticación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              NootTools utiliza autenticación basada en wallet de Solana. No se requieren API keys tradicionales.
            </p>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Autenticación con Wallet</h4>
              <pre className="text-sm overflow-x-auto">
                <code>{`// Ejemplo de autenticación
const wallet = await window.solana.connect();
const signature = await wallet.signMessage(message);

// Headers requeridos
{
  "X-Wallet-Address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "X-Wallet-Signature": "3Bxs7z1GPRVsviUikKzXo...",
  "Content-Type": "application/json"
}`}</code>
              </pre>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={() => copyToClipboard(`const wallet = await window.solana.connect();
const signature = await wallet.signMessage(message);`)}
              >
                <Copy className="w-4 h-4 mr-1" />
                Copiar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <Tabs defaultValue="tokens" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="pools">Pools</TabsTrigger>
            <TabsTrigger value="escrow">Escrow</TabsTrigger>
            <TabsTrigger value="burn">Buy & Burn</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Endpoints de Tokens</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Crear y gestionar tokens SPL Token-2022 con características avanzadas
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {endpoints.filter(e => e.path.includes('tokens')).map((endpoint, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {endpoint.path}
                          </code>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Probar
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {endpoint.description}
                      </p>

                      <Tabs defaultValue="request" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="request">Request</TabsTrigger>
                          <TabsTrigger value="response">Response</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="request">
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">Parámetros</h4>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(endpoint.example)}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copiar
                              </Button>
                            </div>
                            <pre className="text-xs overflow-x-auto">
                              <code>{endpoint.example}</code>
                            </pre>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="response">
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-2">Respuesta</h4>
                            <pre className="text-xs overflow-x-auto">
                              <code>{endpoint.response}</code>
                            </pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Endpoints de Pools de Liquidez</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Crear y gestionar pools de liquidez en Raydium y Orca
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {endpoints.filter(e => e.path.includes('pools')).map((endpoint, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">{endpoint.method}</Badge>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {endpoint.path}
                          </code>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Probar
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {endpoint.description}
                      </p>

                      <Tabs defaultValue="request" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="request">Request</TabsTrigger>
                          <TabsTrigger value="response">Response</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="request">
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">Parámetros</h4>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(endpoint.example)}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copiar
                              </Button>
                            </div>
                            <pre className="text-xs overflow-x-auto">
                              <code>{endpoint.example}</code>
                            </pre>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="response">
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-2">Respuesta</h4>
                            <pre className="text-xs overflow-x-auto">
                              <code>{endpoint.response}</code>
                            </pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escrow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sistema de Escrow</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Gestión automática de escrow para LP tokens
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-2">Escrow Automático</h4>
                    <p className="text-sm text-muted-foreground">
                      El sistema de escrow se activa automáticamente al crear pools de liquidez. 
                      60% de los LP tokens se bloquean hasta cumplir condiciones específicas.
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">GET /api/escrow/:poolId</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Consultar estado del escrow para un pool específico
                    </p>
                    <pre className="text-xs overflow-x-auto">
                      <code>{`{
  "poolId": "4WQSYWkpKKf8VKsT9ZrE6rF7L4EKqFjt2QGZ3JHX9mT2",
  "escrowAmount": "600000",
  "releaseConditions": {
    "uniqueHolders": { "current": 342, "required": 500 },
    "tradingVolume": { "current": 18500, "required": 25000 },
    "timeElapsed": { "current": 21, "required": 30 }
  },
  "isReleased": false,
  "releaseDate": null
}`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="burn" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Buy & Burn Events</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Sistema automático de compra y quema de tokens $NOOT
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {endpoints.filter(e => e.path.includes('burn')).map((endpoint, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">{endpoint.method}</Badge>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {endpoint.path}
                          </code>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Probar
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {endpoint.description}
                      </p>

                      <Tabs defaultValue="request" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="request">Request</TabsTrigger>
                          <TabsTrigger value="response">Response</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="request">
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm">Parámetros</h4>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(endpoint.example)}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copiar
                              </Button>
                            </div>
                            <pre className="text-xs overflow-x-auto">
                              <code>{endpoint.example}</code>
                            </pre>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="response">
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-2">Respuesta</h4>
                            <pre className="text-xs overflow-x-auto">
                              <code>{endpoint.response}</code>
                            </pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Rate Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Límites y Consideraciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Rate Limits</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>100 requests por minuto por wallet</li>
                  <li>10 creaciones de token por día</li>
                  <li>5 pools por hora por wallet</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Costos de Red</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Token creation: ~0.01 SOL</li>
                  <li>Pool creation: ~0.05 SOL</li>
                  <li>Buy & burn: ~0.002 SOL</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">Importante</h4>
              <p className="text-sm text-muted-foreground">
                Todas las operaciones requieren confirmación en la blockchain de Solana. 
                Los tiempos de respuesta pueden variar según la congestión de la red.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SDKs */}
        <Card>
          <CardHeader>
            <CardTitle>SDKs y Bibliotecas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Bibliotecas oficiales para facilitar la integración con NootTools
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">JavaScript/TypeScript</h4>
                <pre className="text-xs bg-muted p-2 rounded">
                  <code>npm install @noottools/sdk</code>
                </pre>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Documentación
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Rust</h4>
                <pre className="text-xs bg-muted p-2 rounded">
                  <code>cargo add noottools-sdk</code>
                </pre>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Documentación
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Python</h4>
                <pre className="text-xs bg-muted p-2 rounded">
                  <code>pip install noottools-sdk</code>
                </pre>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Documentación
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}