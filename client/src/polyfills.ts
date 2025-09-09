// Polyfills for Solana web3.js compatibility in the browser
import { Buffer } from 'buffer';

// Make Buffer available globally for Solana web3.js
(window as any).global = window;
(window as any).Buffer = Buffer;

export {};