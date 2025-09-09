#!/bin/bash

# NootTools - Script de despliegue para Coolify
# Este script automatiza la preparación del proyecto para despliegue

set -e

echo "🚀 Preparando NootTools para despliegue en Coolify..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

print_step "Verificando configuración del proyecto..."

# Verificar archivos necesarios
required_files=("Dockerfile" ".dockerignore" "docker-compose.yml" ".env.example")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Archivo requerido no encontrado: $file"
        exit 1
    fi
done

print_success "Todos los archivos de configuración están presentes"

# Verificar que el puerto esté configurado correctamente
print_step "Verificando configuración del puerto..."
if grep -q "3016" server/index.ts; then
    print_success "Puerto 3016 configurado correctamente para Coolify"
else
    print_warning "El puerto podría no estar configurado correctamente"
fi

# Verificar variables de entorno requeridas
print_step "Verificando variables de entorno..."
if [ ! -f ".env" ]; then
    print_warning "Archivo .env no encontrado. Copia .env.example y configúralo:"
    print_warning "cp .env.example .env"
    print_warning "Luego edita .env con tus configuraciones reales"
fi

# Test de build local (opcional)
if [ "${1:-}" == "--test-build" ]; then
    print_step "Ejecutando build de prueba..."
    npm run build
    if [ $? -eq 0 ]; then
        print_success "Build ejecutado correctamente"
    else
        print_error "Build falló. Revisa los errores antes del despliegue"
        exit 1
    fi
fi

# Instrucciones finales
echo ""
print_success "✅ Proyecto listo para despliegue en Coolify!"
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo ""
echo "1. 🔗 Conecta tu repositorio Git en Coolify"
echo "2. ⚙️  Configura las variables de entorno (ver DEPLOYMENT.md)"
echo "3. 🗄️  Configura la conexión a PostgreSQL"
echo "4. 🚀 Despliega usando el Dockerfile incluido"
echo ""
echo "📖 Variables de entorno requeridas:"
echo "   - PORT=3016 (automático en Coolify)"
echo "   - NODE_ENV=production"
echo "   - DATABASE_URL=postgresql://..."
echo "   - SESSION_SECRET=tu_clave_secreta"
echo ""
echo "📚 Consulta DEPLOYMENT.md para instrucciones detalladas"
echo ""
print_success "🎉 ¡Happy deploying!"