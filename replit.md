# NootTools - Solana Token Launcher

## Overview

NootTools is a comprehensive Solana token launcher application that enables users to create SPL Token-2022 tokens with preconfigured liquidity pools, automated escrow mechanisms, and built-in buy-and-burn functionality. The platform provides a complete no-custody solution for token launches with anti-sniper protection and automated market maker integrations.

The application allows users to create tokens, establish liquidity pools on Raydium or Orca, lock 60% of LP tokens in an on-chain escrow until specific milestones are met (500+ unique holders and $25,000+ trading volume), and implements a 30-second anti-sniper protection mechanism. Additionally, it features an automated buy-and-burn system for $NOOT tokens using 5% of migrated liquidity and trading fees.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React 18 using Vite as the build tool and TypeScript for type safety. The application uses a component-based architecture with shadcn/ui components for consistent UI design patterns. State management is handled through React Query (@tanstack/react-query) for server state and React hooks for local state. The routing system is implemented using Wouter for lightweight client-side navigation.

The UI layer follows a design system based on Tailwind CSS with custom CSS variables for theming support (light/dark modes). Component organization follows atomic design principles with reusable UI components in `/components/ui` and feature-specific components in `/components/features`.

### Backend Architecture
The backend is implemented as a Node.js Express server using TypeScript and ES modules. The architecture follows a RESTful API design with stateless endpoints that don't handle private key management or transaction signing. The server primarily serves as a data persistence layer and provides transaction templates for the frontend.

The application uses an in-memory storage implementation (`MemStorage`) that can be easily replaced with a database-backed solution. API routes are organized by resource type (tokens, pools, escrows, burn events) with proper validation using Zod schemas.

### Data Storage Solutions
The application is configured to use PostgreSQL with Drizzle ORM for database operations. The schema includes tables for tokens, pools, escrows, burn events, and global statistics. The current implementation includes an in-memory storage adapter for development, with migration support through drizzle-kit.

Database configuration uses Neon Database as the PostgreSQL provider, with connection handling through environment variables. The schema supports complex relationships between tokens, their associated pools, escrow states, and burn event tracking.

### Authentication and Authorization
The application follows a non-custodial approach where wallet connections are handled entirely on the frontend through Solana wallet adapters. No private keys are stored server-side, and all transaction signing occurs in the user's browser through connected wallets (Phantom, Solflare, Backpack).

The backend doesn't implement traditional authentication as it serves public data and transaction templates. Security is handled through blockchain-level transaction verification and wallet signature validation.

### External Service Integrations
The application integrates with multiple external services for comprehensive functionality:

- **Solana Blockchain**: Direct integration with Solana RPC nodes for transaction execution and blockchain state queries
- **Neon Database**: PostgreSQL hosting service for data persistence
- **Raydium/Orca AMMs**: Integration with automated market makers for liquidity pool creation and management
- **Jupiter Aggregator**: Swap routing service for multi-hop token exchanges in the buy-and-burn mechanism
- **Pyth Network**: Price oracle integration for real-time token pricing data
- **Switchboard**: Oracle service for holder count and volume tracking

The application is designed to work with SPL Token-2022 standard and includes support for Transfer Hooks for implementing anti-sniper protection. All external integrations are designed to be stateless from the backend perspective, with transaction building happening client-side.

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for frontend development
- **Express.js** with TypeScript for backend API server
- **Vite** for build tooling and development server
- **Node.js** runtime environment

### Database and ORM
- **Drizzle ORM** for database operations and schema management
- **PostgreSQL** (via Neon Database) for data persistence
- **drizzle-kit** for database migrations and schema updates

### UI and Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library built on Radix UI primitives
- **Radix UI** for accessible component primitives
- **class-variance-authority** for component variant management
- **Lucide React** for icon components

### State Management and Data Fetching
- **TanStack React Query** for server state management and caching
- **React Hook Form** for form state management
- **Zod** for runtime type validation and schema definition

### Solana Integration
- **@neondatabase/serverless** for PostgreSQL connection
- **Anchor** framework for Rust smart contract development
- **Solana Web3.js** for blockchain interactions
- **SPL Token** libraries for token operations

### Development and Build Tools
- **TypeScript** for static typing
- **ESLint** and **Prettier** for code quality
- **PostCSS** with Autoprefixer for CSS processing
- **esbuild** for fast JavaScript bundling