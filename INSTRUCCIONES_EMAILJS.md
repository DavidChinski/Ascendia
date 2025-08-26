# 📧 Configuración de EmailJS - Sin Backend

## 🎯 ¿Qué es EmailJS?

EmailJS es un servicio gratuito que permite enviar emails directamente desde el frontend sin necesidad de un servidor backend. Es perfecto para tu caso de uso.

## 🚀 Configuración Rápida (5 minutos)

### 1. Crear cuenta en EmailJS

1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Confirma tu email

### 2. Configurar Gmail como servicio

1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona "Gmail"
4. Conecta tu cuenta de Gmail
5. **Guarda el Service ID** (ejemplo: `service_abc123`)

### 3. Crear plantilla de email

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nueva Solicitud de Demo</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        🚀 Nueva Solicitud de Demo Personalizada
    </h2>
    
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e293b; margin-top: 0;">Información del Cliente</h3>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">👤 Nombre:</strong>
            <span style="color: #1e293b;">{{from_name}}</span>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">📧 Email:</strong>
            <span style="color: #1e293b;">{{from_email}}</span>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">🏢 Empresa/Edificio:</strong>
            <span style="color: #1e293b;">{{empresa}}</span>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #475569;">💬 Mensaje:</strong>
            <p style="color: #1e293b; margin: 10px 0; line-height: 1.6;">{{message}}</p>
        </div>
    </div>
    
    <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
        <p style="margin: 0; color: #1e40af; font-weight: 500;">
            📅 Fecha de solicitud: {{fecha}}
        </p>
    </div>
    
    <div style="margin-top: 30px; padding: 20px; background-color: #f1f5f9; border-radius: 8px;">
        <p style="margin: 0; color: #64748b; font-size: 14px;">
            Este email fue enviado automáticamente desde el formulario de contacto de Ascendia.
            <br>
            Responde directamente a este email para contactar con el cliente.
        </p>
    </div>
</body>
</html>
```

4. **Guarda el Template ID** (ejemplo: `template_xyz789`)

### 4. Obtener tu clave pública

1. Ve a "Account" → "API Keys"
2. **Copia tu Public Key** (ejemplo: `user_def456`)

### 5. Configurar el código

Edita el archivo `src/config/emailjs.ts`:

```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'user_def456',        // Tu clave pública
  SERVICE_ID: 'service_abc123',     // Tu Service ID
  TEMPLATE_ID: 'template_xyz789',   // Tu Template ID
  DEFAULT_TO_EMAIL: 'ascendia.assistance@gmail.com',
};
```

## ✅ ¡Listo!

Ahora tu formulario enviará emails automáticamente a `ascendia.assistance@gmail.com` sin necesidad de backend.

## 🧪 Probar el Sistema

1. Abre tu sitio web
2. Ve al formulario de contacto
3. Llena todos los campos
4. Haz clic en "Solicitar Demo"
5. Verifica que llegue el email

## 🔧 Personalización

### Cambiar email de destino
Edita `src/config/emailjs.ts`:
```typescript
DEFAULT_TO_EMAIL: 'otro-email@gmail.com'
```

### Modificar la plantilla
1. Ve a EmailJS → Email Templates
2. Edita tu plantilla
3. Usa variables como `{{from_name}}`, `{{empresa}}`, etc.

## 🚨 Solución de Problemas

### Error: "EmailJS no está cargado"
- Verifica que la URL del CDN sea correcta
- Revisa la consola del navegador

### Error: "Invalid template parameters"
- Verifica que las variables en la plantilla coincidan con el código
- Asegúrate de que el Template ID sea correcto

### Error: "Service not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté conectado

## 💰 Planes de EmailJS

- **Gratuito:** 200 emails/mes
- **Básico:** $15/mes - 1,000 emails
- **Pro:** $25/mes - 10,000 emails

## 🎉 Ventajas de EmailJS

- ✅ **Sin backend** - Todo funciona en el frontend
- ✅ **Gratis** para uso personal
- ✅ **Fácil de configurar** - Solo 3 claves
- ✅ **Plantillas personalizables** - HTML completo
- ✅ **Confiable** - Servicio establecido
- ✅ **Seguro** - Autenticación OAuth

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador
2. Verifica que las 3 claves sean correctas
3. Comprueba que la plantilla tenga las variables correctas
4. Consulta la [documentación de EmailJS](https://www.emailjs.com/docs/)
