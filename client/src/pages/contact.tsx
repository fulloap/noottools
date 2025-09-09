import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Phone, MapPin, Clock, Send, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(1, "Selecciona un asunto"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  priority: z.string().optional()
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "normal"
    }
  });

  const handleNavigate = (section: string) => {
    console.log("Navigate to:", section);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Mensaje Enviado ✅",
      description: "Hemos recibido tu mensaje. Te responderemos en las próximas 24 horas.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Únete a nuestra comunidad",
      value: "discord.gg/noottools",
      action: "Unirse",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Telegram",
      description: "Chat directo con el equipo",
      value: "@noottools",
      action: "Abrir Chat",
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Soporte técnico y comercial",
      value: "support@noottools.com",
      action: "Enviar Email",
      color: "green"
    },
    {
      icon: Phone,
      title: "Llamada",
      description: "Solo para clientes enterprise",
      value: "Agenda una llamada",
      action: "Agendar",
      color: "purple"
    }
  ];

  const subjectOptions = [
    { value: "technical", label: "Soporte Técnico" },
    { value: "billing", label: "Facturación y Pagos" },
    { value: "partnership", label: "Partnerships" },
    { value: "feature", label: "Solicitud de Característica" },
    { value: "bug", label: "Reporte de Bug" },
    { value: "general", label: "Consulta General" }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      green: "text-green-400 bg-green-500/10 border-green-500/30",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text" data-testid="text-contact-title">
            Contacto
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para apoyarte
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Canales de Comunicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border ${getColorClasses(method.color)}`}>
                    <div className="flex items-start space-x-3">
                      <method.icon className="w-5 h-5 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{method.title}</h4>
                        <p className="text-sm opacity-80 mb-2">{method.description}</p>
                        <p className="text-sm font-mono">{method.value}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {method.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Lunes - Viernes</span>
                  <span className="text-sm font-medium">9:00 - 18:00 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sábados</span>
                  <span className="text-sm font-medium">10:00 - 14:00 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Domingos</span>
                  <span className="text-sm text-muted-foreground">Cerrado</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-medium">
                      Discord y Telegram 24/7
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">NootTools HQ</p>
                  <p className="text-sm text-muted-foreground">
                    Descentralizado 🌐<br />
                    Operamos globalmente desde múltiples ubicaciones
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Remote-First Team
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Completa el formulario y te responderemos en las próximas 24 horas
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre Completo *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Tu nombre" 
                                {...field} 
                                data-testid="input-contact-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="tu@email.com" 
                                {...field} 
                                data-testid="input-contact-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asunto *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-subject">
                                  <SelectValue placeholder="Selecciona un asunto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subjectOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prioridad</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-priority">
                                  <SelectValue placeholder="Selecciona prioridad" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                    Baja
                                  </div>
                                </SelectItem>
                                <SelectItem value="normal">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                                    Normal
                                  </div>
                                </SelectItem>
                                <SelectItem value="high">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                                    Alta
                                  </div>
                                </SelectItem>
                                <SelectItem value="urgent">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                                    Urgente
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe tu consulta, problema o sugerencia en detalle..."
                              className="min-h-[120px]"
                              {...field} 
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">💡 Consejos para obtener una respuesta rápida:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Sé específico sobre tu problema o consulta</li>
                        <li>• Incluye información relevante como wallet address (si aplica)</li>
                        <li>• Para reportes de bugs, incluye pasos para reproducir el problema</li>
                        <li>• Para soporte técnico, incluye capturas de pantalla si es posible</li>
                      </ul>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full py-4 gradient-purple text-white font-semibold hover:opacity-90 transition-opacity"
                      disabled={isSubmitting}
                      data-testid="button-send-message"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-400">Contacto de Emergencia</h4>
                    <p className="text-sm text-muted-foreground">
                      Para problemas críticos de seguridad o incidentes urgentes, contacta: emergency@noottools.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}