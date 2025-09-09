import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenCreation } from "@/components/features/TokenCreation";
import { PoolCreation } from "@/components/features/PoolCreation";
import { EscrowStatus } from "@/components/features/EscrowStatus";
import { BuyAndBurn } from "@/components/features/BuyAndBurn";

export function MainTabs() {
  const [activeTab, setActiveTab] = useState("crear-token");

  // Listen for hash changes to activate corresponding tab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && ['crear-token', 'crear-pool', 'estado', 'burn'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <section className="mb-16" id="main-tabs">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30">
          <TabsTrigger value="crear-token" data-testid="tab-crear-token">
            Crear Token
          </TabsTrigger>
          <TabsTrigger value="crear-pool" data-testid="tab-crear-pool">
            Crear Pool
          </TabsTrigger>
          <TabsTrigger value="estado" data-testid="tab-estado">
            Estado & Escrow
          </TabsTrigger>
          <TabsTrigger value="burn" data-testid="tab-burn">
            Buy & Burn
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="crear-token" id="crear-token">
            <TokenCreation />
          </TabsContent>

          <TabsContent value="crear-pool" id="crear-pool">
            <PoolCreation />
          </TabsContent>

          <TabsContent value="estado" id="estado">
            <EscrowStatus />
          </TabsContent>

          <TabsContent value="burn" id="burn">
            <BuyAndBurn />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
