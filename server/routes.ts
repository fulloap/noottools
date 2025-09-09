import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTokenSchema, insertPoolSchema, insertEscrowSchema, insertBurnEventSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Token routes
  app.post("/api/tokens", async (req, res) => {
    try {
      const tokenData = insertTokenSchema.parse(req.body);
      const token = await storage.createToken(tokenData);
      res.json(token);
    } catch (error) {
      res.status(400).json({ error: "Invalid token data" });
    }
  });

  app.get("/api/tokens", async (req, res) => {
    const tokens = await storage.getTokens();
    res.json(tokens);
  });

  app.get("/api/tokens/:id", async (req, res) => {
    const token = await storage.getToken(req.params.id);
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }
    res.json(token);
  });

  // Pool routes
  app.post("/api/pools", async (req, res) => {
    try {
      const poolData = insertPoolSchema.parse(req.body);
      const pool = await storage.createPool(poolData);
      res.json(pool);
    } catch (error) {
      res.status(400).json({ error: "Invalid pool data" });
    }
  });

  app.get("/api/pools/token/:tokenId", async (req, res) => {
    const pools = await storage.getPoolsByToken(req.params.tokenId);
    res.json(pools);
  });

  // Escrow routes
  app.post("/api/escrows", async (req, res) => {
    try {
      const escrowData = insertEscrowSchema.parse(req.body);
      const escrow = await storage.createEscrow(escrowData);
      res.json(escrow);
    } catch (error) {
      res.status(400).json({ error: "Invalid escrow data" });
    }
  });

  app.get("/api/escrows/:poolId", async (req, res) => {
    const escrow = await storage.getEscrow(req.params.poolId);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    res.json(escrow);
  });

  app.put("/api/escrows/:poolId", async (req, res) => {
    const { holdersCount, volumeUsd } = req.body;
    const escrow = await storage.updateEscrowStatus(req.params.poolId, holdersCount, volumeUsd);
    if (!escrow) {
      return res.status(404).json({ error: "Escrow not found" });
    }
    res.json(escrow);
  });

  // Burn event routes
  app.post("/api/burn-events", async (req, res) => {
    try {
      const burnEventData = insertBurnEventSchema.parse(req.body);
      const burnEvent = await storage.createBurnEvent(burnEventData);
      res.json(burnEvent);
    } catch (error) {
      res.status(400).json({ error: "Invalid burn event data" });
    }
  });

  app.get("/api/burn-events", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const burnEvents = await storage.getBurnEvents(limit);
    res.json(burnEvents);
  });

  // Stats routes
  app.get("/api/stats", async (req, res) => {
    const stats = await storage.getStats();
    res.json(stats);
  });

  app.post("/api/stats/update", async (req, res) => {
    const stats = await storage.updateStats();
    res.json(stats);
  });

  // AMM template routes
  app.get("/api/templates/raydium", (req, res) => {
    res.json({
      name: "Raydium CPMM",
      version: "v2",
      slippage: 0.5,
      fees: {
        trading: 0.0025,
        lp: 0.0025
      },
      requiredAccounts: [
        "poolAuthority",
        "ammId", 
        "ammTarget",
        "poolCoinTokenAccount",
        "poolPcTokenAccount",
        "coinMint",
        "pcMint"
      ]
    });
  });

  app.get("/api/templates/orca", (req, res) => {
    res.json({
      name: "Orca Whirlpool",
      version: "v1",
      slippage: 0.5,
      fees: {
        trading: 0.003,
        lp: 0.003
      },
      requiredAccounts: [
        "whirlpool",
        "tokenMintA",
        "tokenMintB", 
        "tokenVaultA",
        "tokenVaultB",
        "tickArray"
      ]
    });
  });

  // Real-time data simulation
  app.get("/api/realtime/price", (req, res) => {
    const basePrice = 0.000024;
    const variation = (Math.random() - 0.5) * 0.000002;
    const price = Math.max(0.000001, basePrice + variation);
    const change = (variation / basePrice) * 100;
    
    res.json({
      price: price.toFixed(6),
      change24h: change.toFixed(2),
      volume24h: (4230 + Math.floor(Math.random() * 500)).toLocaleString(),
      lastUpdate: new Date().toISOString()
    });
  });

  app.get("/api/realtime/holders", (req, res) => {
    const baseHolders = 234;
    const additional = Math.floor(Math.random() * 10);
    
    res.json({
      count: baseHolders + additional,
      change24h: additional,
      lastUpdate: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
