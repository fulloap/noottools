import { 
  type Token, 
  type Pool, 
  type Escrow, 
  type BurnEvent, 
  type Stats,
  type InsertToken, 
  type InsertPool, 
  type InsertEscrow, 
  type InsertBurnEvent 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Token operations
  createToken(token: InsertToken): Promise<Token>;
  getToken(id: string): Promise<Token | undefined>;
  getTokens(): Promise<Token[]>;

  // Pool operations
  createPool(pool: InsertPool): Promise<Pool>;
  getPool(id: string): Promise<Pool | undefined>;
  getPoolsByToken(tokenId: string): Promise<Pool[]>;

  // Escrow operations
  createEscrow(escrow: InsertEscrow): Promise<Escrow>;
  getEscrow(poolId: string): Promise<Escrow | undefined>;
  updateEscrowStatus(poolId: string, holdersCount: number, volumeUsd: string): Promise<Escrow | undefined>;

  // Burn event operations
  createBurnEvent(burnEvent: InsertBurnEvent): Promise<BurnEvent>;
  getBurnEvents(limit?: number): Promise<BurnEvent[]>;

  // Stats operations
  getStats(): Promise<Stats>;
  updateStats(): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private tokens: Map<string, Token>;
  private pools: Map<string, Pool>;
  private escrows: Map<string, Escrow>;
  private burnEvents: Map<string, BurnEvent>;
  private stats: Stats;

  constructor() {
    this.tokens = new Map();
    this.pools = new Map();
    this.escrows = new Map();
    this.burnEvents = new Map();
    this.stats = {
      id: "global",
      totalTokensCreated: 124,
      totalVolume: "2100000",
      totalBurned: "89234",
      totalHolders: 1200,
      updatedAt: new Date(),
    };
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const id = randomUUID();
    const token: Token = { 
      ...insertToken, 
      id, 
      mintAddress: null,
      createdAt: new Date() 
    };
    this.tokens.set(id, token);
    
    // Update stats
    this.stats.totalTokensCreated += 1;
    this.stats.updatedAt = new Date();
    
    return token;
  }

  async getToken(id: string): Promise<Token | undefined> {
    return this.tokens.get(id);
  }

  async getTokens(): Promise<Token[]> {
    return Array.from(this.tokens.values());
  }

  async createPool(insertPool: InsertPool): Promise<Pool> {
    const id = randomUUID();
    const pool: Pool = { 
      ...insertPool, 
      id, 
      poolAddress: null,
      createdAt: new Date() 
    };
    this.pools.set(id, pool);
    return pool;
  }

  async getPool(id: string): Promise<Pool | undefined> {
    return this.pools.get(id);
  }

  async getPoolsByToken(tokenId: string): Promise<Pool[]> {
    return Array.from(this.pools.values()).filter(pool => pool.tokenId === tokenId);
  }

  async createEscrow(insertEscrow: InsertEscrow): Promise<Escrow> {
    const id = randomUUID();
    const escrow: Escrow = { 
      ...insertEscrow, 
      id, 
      isUnlocked: false,
      holdersCount: 234,
      volumeUsd: "12450",
      updatedAt: new Date() 
    };
    this.escrows.set(insertEscrow.poolId, escrow);
    return escrow;
  }

  async getEscrow(poolId: string): Promise<Escrow | undefined> {
    return this.escrows.get(poolId);
  }

  async updateEscrowStatus(poolId: string, holdersCount: number, volumeUsd: string): Promise<Escrow | undefined> {
    const escrow = this.escrows.get(poolId);
    if (!escrow) return undefined;
    
    escrow.holdersCount = holdersCount;
    escrow.volumeUsd = volumeUsd;
    escrow.isUnlocked = holdersCount >= 500 && parseFloat(volumeUsd) >= 25000;
    escrow.updatedAt = new Date();
    
    return escrow;
  }

  async createBurnEvent(insertBurnEvent: InsertBurnEvent): Promise<BurnEvent> {
    const id = randomUUID();
    const burnEvent: BurnEvent = { 
      ...insertBurnEvent, 
      id, 
      txSignature: null,
      createdAt: new Date() 
    };
    this.burnEvents.set(id, burnEvent);
    
    // Update total burned in stats
    const currentBurned = parseInt(this.stats.totalBurned);
    const newBurned = parseInt(insertBurnEvent.amount);
    this.stats.totalBurned = (currentBurned + newBurned).toString();
    this.stats.updatedAt = new Date();
    
    return burnEvent;
  }

  async getBurnEvents(limit = 10): Promise<BurnEvent[]> {
    const events = Array.from(this.burnEvents.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
    return events;
  }

  async getStats(): Promise<Stats> {
    return this.stats;
  }

  async updateStats(): Promise<Stats> {
    // Simulate real-time updates
    this.stats.totalVolume = (parseFloat(this.stats.totalVolume) + Math.random() * 1000).toFixed(2);
    this.stats.totalHolders += Math.floor(Math.random() * 3);
    this.stats.updatedAt = new Date();
    
    return this.stats;
  }
}

export const storage = new MemStorage();
