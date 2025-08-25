import { Button } from "@/components/ui/button";
import { Mail, Phone, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-background"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Contact Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black mb-6">
            <span className="jandar-text-glow">HABLEMOS</span>
          </h2>
          <p className="text-2xl text-accent max-w-3xl mx-auto">
            ¿Listo para revolucionar tus ascensores?
          </p>
        </div>

        {/* Contact Content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16 items-center">
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-card border border-primary/20 rounded-3xl p-12 glow-primary">
              
              <h3 className="text-3xl font-bold mb-8 jandar-text-glow text-center">
                Demo Personalizada
              </h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Tu nombre"
                    className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                  />
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                  />
                </div>
                
                <input 
                  type="text" 
                  placeholder="Empresa / Edificio"
                  className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                />
                
                <textarea 
                  placeholder="Cuéntanos sobre tu proyecto. ¿Cuántos ascensores? ¿Qué tipo de edificio?"
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300 resize-none"
                ></textarea>
                
                <Button 
                  type="submit"
                  className="w-full jandar-button text-xl py-6 group"
                >
                  Solicitar Demo
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-12">
            
            <div className="text-center lg:text-left">
              <h3 className="text-4xl font-bold mb-6 jandar-text-glow">
                Contacto Directo
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Respuesta en menos de 24h. 
                <br />
                <span className="text-accent">Siempre</span>.
              </p>
            </div>

            <div className="space-y-8">
              <div className="group cursor-pointer">
                <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-card border border-border/20 group-hover:border-primary/30 group-hover:glow-primary transition-all duration-300">
                  <div className="p-4 rounded-xl bg-gradient-primary glow-primary group-hover:animate-pulse-glow">
                    <Mail className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-xl font-bold">hola@jandar.tech</p>
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-card border border-border/20 group-hover:border-secondary/30 group-hover:glow-secondary transition-all duration-300">
                  <div className="p-4 rounded-xl bg-gradient-secondary glow-secondary group-hover:animate-pulse-glow">
                    <Phone className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="text-xl font-bold">+34 900 JANDAR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left">
              <p className="text-lg text-muted-foreground mb-4">
                O simplemente
              </p>
              <Button variant="outline" className="border-accent/30 hover:border-accent hover:bg-accent/10 text-xl px-8 py-4">
                Agenda una llamada 📞
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-24">
          <p className="text-2xl text-primary font-medium">
            El futuro de los ascensores comienza con una conversación
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;