import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/HeroSection";
import { StatsOverview } from "@/components/features/StatsOverview";
import { MainTabs } from "@/components/features/MainTabs";
import { AntiSniperDemo } from "@/components/features/AntiSniperDemo";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  const handleConnectWallet = () => {
    toast({
      title: "Conectando Wallet",
      description: "Simulando conexión de wallet...",
    });
    
    // Simulate wallet connection
    setTimeout(() => {
      toast({
        title: "Wallet Conectada",
        description: "Phantom wallet conectada exitosamente",
      });
    }, 2000);
  };

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    handleNavigate("crear-token");
  };

  const handleViewDocs = () => {
    toast({
      title: "Redirigiendo",
      description: "Abriendo documentación...",
    });
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} onConnectWallet={handleConnectWallet} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <HeroSection onGetStarted={handleGetStarted} onViewDocs={handleViewDocs} />
        <StatsOverview />
        <MainTabs />
        <AntiSniperDemo />
      </main>

      <Footer />
    </div>
  );
}
