export const ESCROW_THRESHOLDS = {
  MIN_HOLDERS: 500,
  MIN_VOLUME_USD: 25000,
};

export const ANTI_SNIPER_DURATION = 30; // seconds

export const AMM_OPTIONS = [
  {
    id: "raydium",
    name: "Raydium",
    type: "CPMM",
    logo: "R",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: "orca", 
    name: "Orca",
    type: "Whirlpool",
    logo: "O",
    gradient: "from-teal-500 to-blue-500",
  },
];

export const PAIR_TOKENS = [
  { symbol: "SOL", name: "Solana" },
  { symbol: "USDC", name: "USD Coin" },
];

export const WALLET_PROVIDERS = [
  "Phantom",
  "Solflare", 
  "Backpack",
];

export const BURN_SOURCES = [
  {
    id: "liquidity_migration",
    name: "5% Liquidez Migrada",
    icon: "💧",
    color: "primary",
  },
  {
    id: "trading_fees",
    name: "Comisiones de Trading",
    icon: "⚡",
    color: "chart-2",
  },
];
