# Dockerfile para NootTools - Solana Token Launcher
FROM node:20-alpine AS base

# Instalar dependencias del sistema necesarias para algunas librerías nativas
RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./
COPY drizzle.config.ts ./

# Instalar dependencias
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# Etapa de desarrollo para instalar devDependencies
FROM base AS dev-deps
RUN npm ci --ignore-scripts

# Etapa de build
FROM dev-deps AS build

# Copiar código fuente
COPY client/ ./client/
COPY server/ ./server/
COPY shared/ ./shared/

# Build del frontend y backend
RUN npm run build

# Etapa de producción
FROM node:20-alpine AS production

WORKDIR /app

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiar dependencias de producción
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./

# Copiar archivos de build
COPY --from=build /app/dist ./dist

# Copiar archivos estáticos del cliente (si existen)
COPY --from=build /app/client/dist ./client/dist

# Cambiar propiedad de archivos al usuario nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponer puerto 3016 para Coolify
EXPOSE 3016

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3016

# Comando de inicio con dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]