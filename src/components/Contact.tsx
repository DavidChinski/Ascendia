import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { initEmailJS, sendEmail } from "@/config/emailjs";

interface FormData {
  nombre: string;
  email: string;
  empresa: string;
  mensaje: string;
}

interface FormStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: false,
    error: null,
  });

  // Cargar EmailJS
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      console.log('EmailJS script cargado');
      initEmailJS();
    };
    script.onerror = () => {
      console.error('Error cargando EmailJS script');
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setStatus({ loading: false, success: false, error: "El nombre es requerido" });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ loading: false, success: false, error: "El email es requerido" });
      return false;
    }
    if (!formData.empresa.trim()) {
      setStatus({ loading: false, success: false, error: "La empresa/edificio es requerido" });
      return false;
    }
    if (!formData.mensaje.trim()) {
      setStatus({ loading: false, success: false, error: "El mensaje es requerido" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus({ loading: true, success: false, error: null });

    try {
      console.log('Enviando email con datos:', formData);
      
      const result = await sendEmail(formData);
      
      console.log('Respuesta de EmailJS:', result);

      if (result.status === 200) {
        setStatus({ loading: false, success: true, error: null });
        // Limpiar formulario después del éxito
        setFormData({
          nombre: "",
          email: "",
          empresa: "",
          mensaje: "",
        });
        // Resetear estado de éxito después de 5 segundos
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        console.error('EmailJS devolvió status no exitoso:', result.status);
        setStatus({ loading: false, success: false, error: `Error del servidor: ${result.status}` });
      }
    } catch (error) {
      console.error('Error completo:', error);
      
      let errorMessage = 'Error al enviar el email. Intenta nuevamente.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        // @ts-ignore
        if (error.text) {
          // @ts-ignore
          errorMessage = `Error: ${error.text}`;
        }
      }
      
      setStatus({ 
        loading: false, 
        success: false, 
        error: errorMessage
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      empresa: "",
      mensaje: "",
    });
    setStatus({ loading: false, success: false, error: null });
  };

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
              
              {/* Status Messages */}
              {status.success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-green-600 font-medium">¡Mensaje enviado exitosamente!</p>
                    <p className="text-green-500 text-sm">Te responderemos en menos de 24 horas.</p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="text-red-600 font-medium">Error al enviar el mensaje</p>
                    <p className="text-red-500 text-sm">{status.error}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    name="nombre"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                    disabled={status.loading}
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                    disabled={status.loading}
                  />
                </div>
                
                <input 
                  type="text" 
                  name="empresa"
                  placeholder="Empresa / Edificio"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300"
                  disabled={status.loading}
                />
                
                <textarea 
                  name="mensaje"
                  placeholder="Cuéntanos sobre tu proyecto. ¿Cuántos ascensores? ¿Qué tipo de edificio?"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-background/50 border border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary focus:glow-primary transition-all duration-300 resize-none"
                  disabled={status.loading}
                ></textarea>
                
                <div className="flex space-x-4">
                  <Button 
                    type="submit"
                    disabled={status.loading}
                    className="flex-1 jandar-button text-xl py-6 group"
                  >
                    {status.loading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar Demo
                        <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </Button>
                  
                  {status.success && (
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="px-6 py-6 border-accent/30 hover:border-accent hover:bg-accent/10"
                    >
                      Nuevo Mensaje
                    </Button>
                  )}
                </div>
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
                    <p className="text-xl font-bold">ascendiaassistance@gmail.com</p>
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
                    <p className="text-xl font-bold">+11 1234 5678</p>
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