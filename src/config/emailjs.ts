// Configuración de EmailJS
export const EMAILJS_CONFIG = {
  // Tu clave pública de EmailJS
  PUBLIC_KEY: 'XoJiVKGAZPjhe_efb',
  
  // ID del servicio de email (Gmail, Outlook, etc.)
  SERVICE_ID: 'service_1yf4l18',
  
  // ID de la plantilla de email
  TEMPLATE_ID: 'template_97ko5he',
  
  // Email de destino por defecto
  DEFAULT_TO_EMAIL: 'ascendia.assistance@gmail.com',
};

// Función para inicializar EmailJS
export const initEmailJS = () => {
  // @ts-ignore
  if (window.emailjs) {
    // @ts-ignore
    window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS inicializado con clave:', EMAILJS_CONFIG.PUBLIC_KEY);
  } else {
    console.error('EmailJS no está disponible en window');
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

  console.log('Enviando email con variables:', {
    email: formData.email,
    nombre: formData.nombre,
    edificio: formData.empresa,
    descripcion: formData.mensaje
  });

  // @ts-ignore
  return await window.emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    {
      email: formData.email,
      nombre: formData.nombre,
      edificio: formData.empresa,
      descripcion: formData.mensaje
    }
  );
};
