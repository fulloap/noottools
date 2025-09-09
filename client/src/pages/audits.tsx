import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Download, ExternalLink, CheckCircle, AlertTriangle, Calendar, Award } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AuditsPage() {
  const handleNavigate = (section: string) => {
    console.log("Navigate to:", section);
  };

  const audits = [
    {
      firm: "Trail of Bits",
      date: "Diciembre 2024",
      status: "Completada",
      score: 95,
      type: "Smart Contracts",
      findings: {
        critical: 0,
        high: 1,
        medium: 3,
        low: 5,
        informational: 8
      },
      description: "Auditoría completa de smart contracts principales incluyendo token creation, escrow system y buy-and-burn mechanism.",
      reportUrl: "#",
      certified: true
    },
    {
      firm: "Quantstamp",
      date: "Noviembre 2024", 
      status: "Completada",
      score: 92,
      type: "Protocol Security",
      findings: {
        critical: 0,
        high: 0,
        medium: 2,
        low: 4,
        informational: 12
      },
      description: "Revisión de seguridad del protocolo, anti-sniper protection y integración con AMMs.",
      reportUrl: "#",
      certified: true
    },
    {
      firm: "ConsenSys Diligence",
      date: "Octubre 2024",
      status: "Completada", 
      score: 88,
      type: "Economic Model",
      findings: {
        critical: 0,
        high: 2,
        medium: 4,
        low: 6,
        informational: 10
      },
      description: "Análisis del modelo económico, tokenomics y mecanismos de incentivos.",
      reportUrl: "#",
      certified: true
    },
    {
      firm: "Halborn Security",
      date: "En Progreso",
      status: "En Progreso",
      score: null,
      type: "Penetration Testing",
      findings: null,
      description: "Pruebas de penetración y análisis de vulnerabilidades de infraestructura.",
      reportUrl: null,
      certified: false
    }
  ];

  const securityMeasures = [
    {
      category: "Smart Contract Security",
      measures: [
        "Implementación de OpenZeppelin libraries",
        "Funciones de pausado de emergencia",
        "Rate limiting en operaciones críticas",
        "Validación exhaustiva de inputs",
        "Protección contra reentrancy attacks"
      ]
    },
    {
      category: "Protocol Security", 
      measures: [
        "Multi-signature governance",
        "Timelock para cambios críticos",
        "Circuit breakers automatizados",
        "Monitoreo en tiempo real",
        "Sistema de alertas tempranas"
      ]
    },
    {
      category: "Infrastructure Security",
      measures: [
        "Encriptación end-to-end",
        "Autenticación multi-factor",
        "Logs de auditoría detallados",
        "Backups encriptados regulares",
        "Segmentación de red"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completada":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "En Progreso":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "Pendiente":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-500/10";
      case "high":
        return "text-orange-400 bg-orange-500/10";
      case "medium":
        return "text-yellow-400 bg-yellow-500/10";
      case "low":
        return "text-blue-400 bg-blue-500/10";
      case "informational":
        return "text-gray-400 bg-gray-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text" data-testid="text-audits-title">
            Auditorías de Seguridad
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-audits-subtitle">
            Transparencia total en seguridad. Todas nuestras auditorías son públicas y realizadas por las firmas más prestigiosas del ecosistema.
          </p>
        </div>

        {/* Security Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-6 h-6 mr-2 text-green-400" />
              Resumen de Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">4</div>
                <div className="text-sm text-muted-foreground">Auditorías Realizadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">0</div>
                <div className="text-sm text-muted-foreground">Vulnerabilidades Críticas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">92%</div>
                <div className="text-sm text-muted-foreground">Score Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Issues Resueltos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audits List */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold">Auditorías Realizadas</h2>
          
          {audits.map((audit, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {audit.firm}
                        {audit.certified && (
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            <Award className="w-3 h-3 mr-1" />
                            Certificado
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {audit.date}
                        </div>
                        <Badge variant="outline" className={getStatusColor(audit.status)}>
                          {audit.status}
                        </Badge>
                        <Badge variant="secondary">{audit.type}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  {audit.score && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{audit.score}%</div>
                      <div className="text-sm text-muted-foreground">Security Score</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{audit.description}</p>
                
                {audit.findings && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Hallazgos</h4>
                    <div className="grid grid-cols-5 gap-3">
                      {Object.entries(audit.findings).map(([severity, count]) => (
                        <div key={severity} className={`p-3 rounded-lg border ${getSeverityColor(severity)}`}>
                          <div className="text-center">
                            <div className="text-lg font-bold">{count}</div>
                            <div className="text-xs capitalize">{severity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  {audit.reportUrl && (
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Reporte
                    </Button>
                  )}
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver en {audit.firm}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Measures */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold">Medidas de Seguridad Implementadas</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {securityMeasures.map((category, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.measures.map((measure, measureIdx) => (
                      <li key={measureIdx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bug Bounty */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-orange-400" />
              Programa de Bug Bounty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Ofrecemos recompensas por la identificación responsable de vulnerabilidades de seguridad.
            </p>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-400 mb-2">$50,000</div>
                <div className="text-sm text-muted-foreground">Crítico</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-400 mb-2">$10,000</div>
                <div className="text-sm text-muted-foreground">Alto</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-2">$2,500</div>
                <div className="text-sm text-muted-foreground">Medio</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-2">$500</div>
                <div className="text-sm text-muted-foreground">Bajo</div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Cómo Reportar</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>1. Envía un email detallado a: security@noottools.com</li>
                <li>2. Incluye prueba de concepto (PoC) cuando sea posible</li>
                <li>3. NO publiques la vulnerabilidad públicamente antes del fix</li>
                <li>4. Respuesta garantizada en 24-48 horas</li>
              </ul>
            </div>
            
            <Button className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Términos Completos del Bug Bounty
            </Button>
          </CardContent>
        </Card>

        {/* Continuous Security */}
        <Card>
          <CardHeader>
            <CardTitle>Seguridad Continua</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              La seguridad no es un evento único. Mantenemos un programa continuo de monitoreo y mejora.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Monitoreo de Transacciones</span>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Activo 24/7
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Análisis de Código Automático</span>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Cada Commit
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Revisión Manual de PRs</span>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  100% Coverage
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Próxima Auditoría Programada</span>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  Q2 2025
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}