# 🚀 Guía de Despliegue - NootTools

## Despliegue en Coolify

### Requisitos Previos

1. **Servidor con Docker**: Coolify instalado y funcionando
2. **Base de Datos PostgreSQL**: Instancia configurada y accesible
3. **Variables de Entorno**: Configuradas en Coolify

### Configuración en Coolify

#### 1. Variables de Entorno Requeridas

```bash
# Puerto (Coolify lo configurará automáticamente)
PORT=3016

# Entorno de producción
NODE_ENV=production

# Base de datos (REQUERIDO)
DATABASE_URL=postgresql://usuario:password@host:5432/noottools

# Red Solana (opcional, por defecto usa devnet)
SOLANA_NETWORK=mainnet-beta
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Clave de sesión (GENERAR UNA NUEVA)
SESSION_SECRET=tu_clave_secreta_aleatoria_de_32_caracteres

# Orígenes CORS permitidos
ALLOWED_ORIGINS=https://tudominio.com
```

#### 2. Configuración del Proyecto

- **Puerto de aplicación**: `3016`
- **Comando de build**: Se ejecuta automáticamente en Docker
- **Comando de inicio**: `node dist/index.js`
- **Dockerfile**: Usar el Dockerfile incluido en el repositorio

#### 3. Directorios Persistentes

**NO se requieren directorios persistentes** ya que:
- La aplicación es stateless
- Los datos se almacenan en PostgreSQL externa
- Los archivos estáticos se generan en build time

### Configuración de Base de Datos

#### Opción 1: PostgreSQL Externa
```bash
# En Coolify, configura la variable:
DATABASE_URL=postgresql://usuario:password@tu-servidor-postgres:5432/noottools
```

#### Opción 2: PostgreSQL en Coolify
1. Crear un servicio PostgreSQL en Coolify
2. Conectar la aplicación usando la URL interna
3. La URL se generará automáticamente

### Proceso de Despliegue

1. **Conectar Repositorio**: Agregar el repositorio Git en Coolify
2. **Configurar Variables**: Establecer todas las variables de entorno
3. **Build Automático**: Coolify construirá usando el Dockerfile
4. **Verificar Salud**: El endpoint `/api/stats` se usa para health checks

### Verificación Post-Despliegue

Una vez desplegado, verifica:

```bash
# Health check
curl https://tu-dominio.com/api/stats

# Debería responder con estadísticas del sistema
{
  "id": "global",
  "totalTokensCreated": 0,
  "totalVolume": "0",
  "totalBurned": "0",
  "activeEscrows": 0
}
```

### Troubleshooting

#### Error de Conexión a Base de Datos
- Verificar `DATABASE_URL`
- Comprobar conectividad de red
- Revisar logs: `docker logs <container-name>`

#### Puerto no disponible
- Coolify debe configurar automáticamente el puerto 3016
- Verificar que no haya conflictos con otros servicios

#### Problemas de Build
- Verificar que todas las dependencias estén en `package.json`
- Comprobar logs de build en Coolify
- El build puede tardar 3-5 minutos por las dependencias de Solana

### Monitoreo y Logs

- **Health Check**: `GET /api/stats` cada 30 segundos
- **Logs**: Disponibles en la interfaz de Coolify
- **Métricas**: Uso de CPU/Memoria visible en dashboard

### Actualizaciones

1. **Push a main/master**: Activa build automático
2. **Zero Downtime**: Coolify maneja el rolling deployment
3. **Rollback**: Disponible desde la interfaz si hay problemas

---

## Variables de Entorno Detalladas

| Variable | Requerida | Descripción | Ejemplo |
|----------|-----------|-------------|---------|
| `PORT` | No | Puerto del servidor | `3016` |
| `NODE_ENV` | Sí | Entorno de ejecución | `production` |
| `DATABASE_URL` | Sí | URL de PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `SOLANA_NETWORK` | No | Red de Solana | `mainnet-beta` |
| `SOLANA_RPC_URL` | No | URL del RPC | `https://api.mainnet-beta.solana.com` |
| `SESSION_SECRET` | Sí | Clave de sesión | `string-aleatorio-32-chars` |
| `ALLOWED_ORIGINS` | No | Dominios CORS | `https://miapp.com` |

## Estimaciones de Recursos

- **CPU**: 0.5-1 core
- **RAM**: 512MB-1GB
- **Almacenamiento**: 1GB (principalmente dependencias)
- **Red**: 10-50MB/día (depende del tráfico)