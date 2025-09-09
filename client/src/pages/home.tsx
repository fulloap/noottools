import { useState, useEffect } from "react";
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

  // Handle navigation from URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the # character
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        handleNavigate(hash);
      }, 100);
    }
  }, []);

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
      <Header onNavigate={handleNavigate} />
      
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
