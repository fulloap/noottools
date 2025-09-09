import { Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-gradient" data-testid="text-footer-brand">NootTools</span>
            </div>
            <p className="text-muted-foreground mb-4" data-testid="text-footer-description">
              Lanzador de tokens descentralizado en Solana. Sin custodia, sin fees, open source.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-github"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-4" data-testid="text-product-title">Producto</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/#crear-token" className="hover:text-primary transition-colors" data-testid="link-crear-token">Crear Token</a></li>
              <li><a href="/#crear-pool" className="hover:text-primary transition-colors" data-testid="link-crear-pool">Crear Pool</a></li>
              <li><a href="/#estado" className="hover:text-primary transition-colors" data-testid="link-escrow">Escrow</a></li>
              <li><a href="/#burn" className="hover:text-primary transition-colors" data-testid="link-buy-burn">Buy & Burn</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4" data-testid="text-resources-title">Recursos</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/docs" className="hover:text-primary transition-colors" data-testid="link-docs">Documentación</a></li>
              <li><a href="/api" className="hover:text-primary transition-colors" data-testid="link-api">API</a></li>
              <li><a href="/github" className="hover:text-primary transition-colors" data-testid="link-github">GitHub</a></li>
              <li><a href="/audits" className="hover:text-primary transition-colors" data-testid="link-audits">Auditorías</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4" data-testid="text-support-title">Soporte</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="https://discord.gg/noottools" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="link-discord">Discord</a></li>
              <li><a href="https://t.me/noottools" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="link-telegram">Telegram</a></li>
              <li><a href="/faq" className="hover:text-primary transition-colors" data-testid="link-faq">FAQ</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors" data-testid="link-contact">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground" data-testid="text-copyright">© 2024 NootTools. Licencia MIT. Open Source.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-muted-foreground">Construido en</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-green-400" data-testid="icon-solana"></div>
              <span className="font-bold text-gradient" data-testid="text-solana">Solana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
