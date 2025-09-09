import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenCreation } from "@/components/features/TokenCreation";
import { PoolCreation } from "@/components/features/PoolCreation";
import { EscrowStatus } from "@/components/features/EscrowStatus";
import { BuyAndBurn } from "@/components/features/BuyAndBurn";

export function MainTabs() {
  const [activeTab, setActiveTab] = useState("crear-token");

  return (
    <section className="mb-16">
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
          <TabsContent value="crear-token">
            <TokenCreation />
          </TabsContent>

          <TabsContent value="crear-pool">
            <PoolCreation />
          </TabsContent>

          <TabsContent value="estado">
            <EscrowStatus />
          </TabsContent>

          <TabsContent value="burn">
            <BuyAndBurn />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
