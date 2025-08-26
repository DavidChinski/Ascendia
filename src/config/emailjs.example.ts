// COPIA ESTE ARCHIVO A emailjs.ts Y COMPLETA CON TUS CLAVES

// Configuración de EmailJS
export const EMAILJS_CONFIG = {
  // Tu clave pública de EmailJS (Account → API Keys)
  PUBLIC_KEY: 'user_xxxxxxxxxxxxxxxxxxxxx',
  
  // ID del servicio de email (Email Services → Gmail)
  SERVICE_ID: 'service_xxxxxxxxxxxxx',
  
  // ID de la plantilla de email (Email Templates)
  TEMPLATE_ID: 'template_xxxxxxxxxxxxx',
  
  // Email de destino por defecto
  DEFAULT_TO_EMAIL: 'ascendia.assistance@gmail.com',
};

// Función para inicializar EmailJS
export const initEmailJS = () => {
  // @ts-ignore
  if (window.emailjs) {
    // @ts-ignore
    window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
};

// Función para enviar email
export const sendEmail = async (formData: {
  nombre: string;
  email: string;
  empresa: string;
  mensaje: string;
}) => {
  // @ts-ignore
  if (!window.emailjs) {
    throw new Error('EmailJS no está cargado');
  }

  // @ts-ignore
  return await window.emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    {
      to_email: EMAILJS_CONFIG.DEFAULT_TO_EMAIL,
      from_name: formData.nombre,
      from_email: formData.email,
      empresa: formData.empresa,
      message: formData.mensaje,
      reply_to: formData.email,
    }
  );
};
