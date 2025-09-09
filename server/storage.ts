import { 
  type Token, 
  type Pool, 
  type Escrow, 
  type BurnEvent, 
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
  getTokenByMint(mintAddress: string): Promise<Token | undefined>;

  // Pool operations
  createPool(pool: InsertPool): Promise<Pool>;
  getPool(id: string): Promise<Pool | undefined>;
  getPoolsByToken(tokenId: string): Promise<Pool[]>;

  // Escrow operations
  createEscrow(escrow: InsertEscrow): Promise<Escrow>;
  getEscrow(poolId: string): Promise<Escrow | undefined>;
  updateEscrowStatus(poolId: string, holdersCount: number, volumeUsd: number): Promise<Escrow | undefined>;

  // Burn event operations
  createBurnEvent(burnEvent: InsertBurnEvent): Promise<BurnEvent>;
  getBurnEvents(limit?: number): Promise<BurnEvent[]>;

  // Stats operations
  getStats(): Promise<{
    id: string;
    totalTokensCreated: number;
    totalVolumeUSD: number;
    totalLiquidityLocked: number;
    totalBurned: number;
    averageHolders: number;
  }>;
  updateStats(): Promise<any>;
}

// In-memory storage implementation for development
// In production, this would be replaced with database-backed storage
export class MemStorage implements IStorage {
  private tokens: Map<string, Token> = new Map();
  private pools: Map<string, Pool> = new Map();
  private escrows: Map<string, Escrow> = new Map();
  private burnEvents: BurnEvent[] = [];
  private nextId = 1;

  // Token operations
  async createToken(tokenData: InsertToken): Promise<Token> {
    const token: Token = {
      id: randomUUID(),
      ...tokenData,
      decimals: tokenData.decimals ?? 9,
      mintAddress: null,
      createdAt: new Date()
    };
    
    this.tokens.set(token.id, token);
    return token;
  }

  async getTokens(): Promise<Token[]> {
    return Array.from(this.tokens.values());
  }

  async getToken(id: string): Promise<Token | undefined> {
    return this.tokens.get(id);
  }

  async getTokenByMint(mintAddress: string): Promise<Token | undefined> {
    for (const token of Array.from(this.tokens.values())) {
      if (token.mintAddress === mintAddress) {
        return token;
      }
    }
    return undefined;
  }

  // Pool operations
  async createPool(poolData: InsertPool): Promise<Pool> {
    const pool: Pool = {
      id: randomUUID(),
      ...poolData,
      poolAddress: null,
      createdAt: new Date()
    };
    
    this.pools.set(pool.id, pool);
    return pool;
  }

  async getPoolsByToken(tokenId: string): Promise<Pool[]> {
    return Array.from(this.pools.values()).filter(pool => pool.tokenId === tokenId);
  }

  async getPool(id: string): Promise<Pool | undefined> {
    return this.pools.get(id);
  }

  // Escrow operations
  async createEscrow(escrowData: InsertEscrow): Promise<Escrow> {
    const escrow: Escrow = {
      id: randomUUID(),
      ...escrowData,
      isUnlocked: false,
      holdersCount: 0,
      volumeUsd: "0",
      updatedAt: new Date()
    };
    
    this.escrows.set(escrow.poolId, escrow);
    return escrow;
  }

  async getEscrow(poolId: string): Promise<Escrow | undefined> {
    return this.escrows.get(poolId);
  }

  async updateEscrowStatus(poolId: string, holdersCount: number, volumeUsd: number): Promise<Escrow | undefined> {
    const escrow = this.escrows.get(poolId);
    if (!escrow) return undefined;

    escrow.holdersCount = holdersCount;
    escrow.volumeUsd = volumeUsd.toString();
    escrow.isUnlocked = holdersCount >= 500 && volumeUsd >= 25000;
    escrow.updatedAt = new Date();

    return escrow;
  }

  // Burn event operations
  async createBurnEvent(burnEventData: InsertBurnEvent): Promise<BurnEvent> {
    const burnEvent: BurnEvent = {
      id: randomUUID(),
      ...burnEventData,
      txSignature: null,
      createdAt: new Date()
    };
    
    this.burnEvents.push(burnEvent);
    return burnEvent;
  }

  async getBurnEvents(limit: number = 10): Promise<BurnEvent[]> {
    return this.burnEvents
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  // Real statistics based on stored data
  async getStats(): Promise<{
    id: string;
    totalTokensCreated: number;
    totalVolumeUSD: number;
    totalLiquidityLocked: number;
    totalBurned: number;
    averageHolders: number;
  }> {
    // Calculate real statistics from stored data
    const tokens = Array.from(this.tokens.values());
    const pools = Array.from(this.pools.values());
    const escrows = Array.from(this.escrows.values());
    const burnEvents = this.burnEvents;

    const totalLiquidityLocked = escrows.reduce((sum, escrow) => 
      sum + parseFloat(escrow.lockedLpAmount || "0"), 0
    );

    const totalBurned = burnEvents.reduce((sum, event) => 
      sum + parseFloat(event.amount), 0
    );

    const totalVolume = escrows.reduce((sum, escrow) => 
      sum + parseFloat(escrow.volumeUsd || "0"), 0
    );

    const averageHolders = escrows.length > 0 
      ? escrows.reduce((sum, escrow) => sum + (escrow.holdersCount || 0), 0) / escrows.length
      : 0;

    return {
      id: "global",
      totalTokensCreated: tokens.length,
      totalVolumeUSD: totalVolume,
      totalLiquidityLocked,
      totalBurned,
      averageHolders: Math.round(averageHolders)
    };
  }

  async updateStats(): Promise<any> {
    // In real implementation, this would trigger recalculation of cached stats
    return this.getStats();
  }
}

// Export storage instance
export const storage = new MemStorage();