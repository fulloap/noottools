import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Star, GitFork, Code, Download, ExternalLink, Users, Calendar, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function GitHubPage() {
  const handleNavigate = (section: string) => {
    console.log("Navigate to:", section);
  };

  const repositories = [
    {
      name: "noottools-core",
      description: "Smart contracts principales para creación de tokens y pools de liquidez",
      language: "Rust",
      stars: 1247,
      forks: 234,
      issues: 12,
      lastCommit: "2 horas",
      version: "v2.1.4",
      license: "MIT",
      status: "Active"
    },
    {
      name: "noottools-frontend",
      description: "Interfaz web React para interactuar con los smart contracts",
      language: "TypeScript",
      stars: 892,
      forks: 156,
      issues: 8,
      lastCommit: "4 horas",
      version: "v1.8.2",
      license: "MIT", 
      status: "Active"
    },
    {
      name: "noottools-sdk",
      description: "SDK JavaScript/TypeScript para desarrolladores",
      language: "TypeScript",
      stars: 567,
      forks: 89,
      issues: 3,
      lastCommit: "1 día",
      version: "v0.9.1",
      license: "MIT",
      status: "Active"
    },
    {
      name: "noottools-docs",
      description: "Documentación técnica y guías para desarrolladores",
      language: "MDX",
      stars: 234,
      forks: 67,
      issues: 5,
      lastCommit: "3 días",
      version: "v1.2.0",
      license: "Creative Commons",
      status: "Active"
    }
  ];

  const contributors = [
    { name: "Alex Rodriguez", avatar: "👨‍💻", commits: 1234, role: "Lead Developer" },
    { name: "Sarah Chen", avatar: "👩‍💻", commits: 892, role: "Smart Contract Engineer" },
    { name: "Miguel Santos", avatar: "👨‍💻", commits: 745, role: "Frontend Developer" },
    { name: "Emma Wilson", avatar: "👩‍💻", commits: 623, role: "DevOps Engineer" },
    { name: "David Kim", avatar: "👨‍💻", commits: 456, role: "Security Researcher" },
    { name: "Lisa Johnson", avatar: "👩‍💻", commits: 389, role: "Technical Writer" }
  ];

  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "In Progress",
      items: [
        "Cross-chain bridge integration",
        "Advanced analytics dashboard", 
        "Mobile app beta release",
        "Governance token launch"
      ]
    },
    {
      quarter: "Q2 2025",
      status: "Planned",
      items: [
        "Multi-DEX aggregation",
        "Yield farming strategies",
        "NFT integration",
        "Enterprise API"
      ]
    },
    {
      quarter: "Q3 2025", 
      status: "Planned",
      items: [
        "Layer 2 scaling solutions",
        "AI-powered risk assessment",
        "Social trading features",
        "Mobile app full release"
      ]
    }
  ];

  const getLanguageColor = (language: string) => {
    const colors = {
      "Rust": "text-orange-400 bg-orange-500/10",
      "TypeScript": "text-blue-400 bg-blue-500/10", 
      "JavaScript": "text-yellow-400 bg-yellow-500/10",
      "MDX": "text-purple-400 bg-purple-500/10"
    };
    return colors[language as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Active": "text-green-400 bg-green-500/10 border-green-500/30",
      "In Progress": "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
      "Planned": "text-blue-400 bg-blue-500/10 border-blue-500/30"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text" data-testid="text-github-title">
            Open Source
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-github-subtitle">
            NootTools es completamente open source. Explora nuestro código, contribuye al proyecto y construye sobre nuestra plataforma.
          </p>
        </div>

        {/* GitHub Stats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Github className="w-6 h-6 mr-2" />
              Estadísticas del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                <div className="text-sm text-muted-foreground">Repositorios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">2.9k</div>
                <div className="text-sm text-muted-foreground">Stars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">546</div>
                <div className="text-sm text-muted-foreground">Forks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">28</div>
                <div className="text-sm text-muted-foreground">Issues Abiertas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">847</div>
                <div className="text-sm text-muted-foreground">Pull Requests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">6</div>
                <div className="text-sm text-muted-foreground">Contribuidores</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="repositories" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="repositories">Repositorios</TabsTrigger>
            <TabsTrigger value="contributors">Contribuidores</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="contributing">Contribuir</TabsTrigger>
          </TabsList>

          <TabsContent value="repositories" className="space-y-6">
            <div className="space-y-4">
              {repositories.map((repo, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{repo.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{repo.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(repo.status)}>
                        {repo.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={getLanguageColor(repo.language)}>
                          {repo.language}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="w-4 h-4 mr-1" />
                          {repo.stars.toLocaleString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <GitFork className="w-4 h-4 mr-1" />
                          {repo.forks}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {repo.issues} issues
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{repo.version}</div>
                        <div className="text-xs text-muted-foreground">hace {repo.lastCommit}</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        Ver en GitHub
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Clonar
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Documentación
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  Equipo y Contribuidores
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Conoce a las personas que hacen posible NootTools
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {contributors.map((contributor, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="text-3xl">{contributor.avatar}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{contributor.name}</div>
                        <div className="text-sm text-muted-foreground">{contributor.role}</div>
                        <div className="text-sm text-blue-400">{contributor.commits.toLocaleString()} commits</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>¿Quieres Contribuir?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Siempre estamos buscando desarrolladores talentosos que quieran contribuir al ecosistema de DeFi en Solana.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Code className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <h4 className="font-semibold mb-2">Developers</h4>
                    <p className="text-sm text-muted-foreground">Rust, TypeScript, Solana</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <h4 className="font-semibold mb-2">Community</h4>
                    <p className="text-sm text-muted-foreground">Discord, Testing, Feedback</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <ExternalLink className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <h4 className="font-semibold mb-2">Documentation</h4>
                    <p className="text-sm text-muted-foreground">Guías, Tutoriales, Traducciones</p>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  Ver Oportunidades de Contribución
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="space-y-6">
              {roadmapItems.map((quarter, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        {quarter.quarter}
                      </CardTitle>
                      <Badge variant="outline" className={getStatusColor(quarter.status)}>
                        {quarter.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {quarter.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contributing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guía de Contribución</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Cómo Empezar</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Haz fork del repositorio que quieras contribuir</li>
                    <li>Clona tu fork localmente</li>
                    <li>Crea una rama para tu feature: <code className="bg-muted px-1 rounded">git checkout -b feature/amazing-feature</code></li>
                    <li>Haz tus cambios y añade tests cuando sea apropiado</li>
                    <li>Asegúrate de que todos los tests pasan</li>
                    <li>Haz commit de tus cambios con un mensaje descriptivo</li>
                    <li>Push a tu rama: <code className="bg-muted px-1 rounded">git push origin feature/amazing-feature</code></li>
                    <li>Abre un Pull Request</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Estándares de Código</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Sigue las convenciones de naming del proyecto</li>
                    <li>Añade documentación para nuevas funciones</li>
                    <li>Escribe tests para nuevas características</li>
                    <li>Usa prettier para formatear código TypeScript/JavaScript</li>
                    <li>Usa rustfmt para formatear código Rust</li>
                    <li>Haz commits atómicos con mensajes claros</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Proceso de Review</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Todos los PRs son revisados por al menos 2 maintainers</li>
                    <li>Los tests CI/CD deben pasar antes del merge</li>
                    <li>Para cambios en smart contracts, se requiere auditoría de seguridad</li>
                    <li>PRs grandes deben ser divididos en cambios más pequeños cuando sea posible</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Código de Conducta</h4>
                  <p className="text-sm text-muted-foreground">
                    Seguimos el Contributor Covenant Code of Conduct. Por favor lee nuestro código de conducta completo en GitHub antes de contribuir.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button>
                    <Github className="w-4 h-4 mr-2" />
                    Ver Issues Abiertos
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Guía Completa de Contribución
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipos de Contribución</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-semibold mb-2">Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Nuevas features, bug fixes, optimizaciones
                    </p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-2">Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Guías, tutoriales, mejoras en docs
                    </p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-semibold mb-2">Community</h4>
                    <p className="text-sm text-muted-foreground">
                      Ayudar a otros, testing, feedback
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}