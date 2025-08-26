# 🚨 Solución del Error de EmailJS

## ❌ Problema Actual
```
Error al enviar el mensaje
Error al enviar el email. Intenta nuevamente.
```

## 🔍 Pasos para Solucionar

### 1. Verificar la Consola del Navegador

1. **Abre tu sitio web**
2. **Presiona F12** (o clic derecho → Inspeccionar)
3. **Ve a la pestaña "Console"**
4. **Llena el formulario y envía**
5. **Revisa los mensajes de error**

### 2. Verificar la Plantilla de EmailJS

**IMPORTANTE:** La plantilla debe tener exactamente estas variables:

```html
{{from_name}}      <!-- Nombre del usuario -->
{{from_email}}     <!-- Email del usuario -->
{{empresa}}        <!-- Empresa/Edificio -->
{{message}}        <!-- Mensaje del usuario -->
{{fecha}}          <!-- Fecha de solicitud -->
{{hora}}           <!-- Hora de solicitud -->
```

**Si tu plantilla tiene variables diferentes, debes:**

**Opción A:** Cambiar la plantilla para usar estas variables
**Opción B:** Cambiar el código para usar tus variables

### 3. Probar con la Página de Prueba

1. **Abre el archivo `test-emailjs.html`** en tu navegador
2. **Llena el formulario de prueba**
3. **Haz clic en "Enviar Email de Prueba"**
4. **Revisa los logs para ver qué está pasando**

### 4. Verificar Configuración de EmailJS

En `src/config/emailjs.ts`, verifica que tengas:

```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'XoJiVKGAZPjhe_efb',        // ✅ Correcto
  SERVICE_ID: 'service_1yf4l18',           // ✅ Correcto  
  TEMPLATE_ID: 'template_xvcga3t',         // ✅ Correcto
  DEFAULT_TO_EMAIL: 'ascendia.assistance@gmail.com'
};
```

### 5. Verificar el Servicio de Gmail

1. **Ve a [EmailJS.com](https://www.emailjs.com/)**
2. **Inicia sesión**
3. **Ve a "Email Services"**
4. **Verifica que el servicio `service_1yf4l18` esté:**
   - ✅ Conectado a Gmail
   - ✅ Activo
   - ✅ Sin errores

### 6. Verificar la Plantilla

1. **Ve a "Email Templates"**
2. **Abre la plantilla `template_xvcga3t`**
3. **Verifica que tenga las variables correctas**
4. **Guarda si hiciste cambios**

## 🧪 Pruebas de Diagnóstico

### Prueba 1: Verificar Inicialización
```javascript
// En la consola del navegador
console.log('EmailJS disponible:', typeof window.emailjs !== 'undefined');
```

### Prueba 2: Verificar Configuración
```javascript
// En la consola del navegador
console.log('Configuración:', {
  PUBLIC_KEY: 'XoJiVKGAZPjhe_efb',
  SERVICE_ID: 'service_1yf4l18',
  TEMPLATE_ID: 'template_xvcga3t'
});
```

### Prueba 3: Envío Manual
```javascript
// En la consola del navegador
emailjs.send(
  'service_1yf4l18',
  'template_xvcga3t',
  {
    from_name: 'Test',
    from_email: 'test@test.com',
    empresa: 'Test Company',
    message: 'Test message',
    fecha: 'Hoy',
    hora: 'Ahora'
  }
).then(
  function(response) {
    console.log('SUCCESS!', response);
  },
  function(error) {
    console.log('FAILED...', error);
  }
);
```

## 🚨 Errores Comunes y Soluciones

### Error: "Invalid template parameters"
- **Causa:** Variables en la plantilla no coinciden con el código
- **Solución:** Usar la plantilla de ejemplo o ajustar el código

### Error: "Service not found"
- **Causa:** Service ID incorrecto o servicio no conectado
- **Solución:** Verificar Email Services en el dashboard

### Error: "Template not found"
- **Causa:** Template ID incorrecto
- **Solución:** Verificar Email Templates en el dashboard

### Error: "Authentication failed"
- **Causa:** Public Key incorrecta
- **Solución:** Verificar API Keys en Account

## 📋 Checklist de Verificación

- [ ] Consola del navegador sin errores
- [ ] Plantilla tiene variables correctas
- [ ] Service ID es correcto y está activo
- [ ] Template ID es correcto
- [ ] Public Key es correcta
- [ ] Página de prueba funciona
- [ ] Gmail está conectado en EmailJS

## 🆘 Si Nada Funciona

1. **Crea una nueva plantilla** usando `PLANTILLA_EMAILJS.html`
2. **Crea un nuevo servicio** de Gmail
3. **Obtén nuevas claves** y actualiza `emailjs.ts`
4. **Contacta soporte** de EmailJS

## 📞 Recursos de Ayuda

- **Documentación EmailJS:** [docs.emailjs.com](https://docs.emailjs.com/)
- **Página de prueba:** `test-emailjs.html`
- **Plantilla de ejemplo:** `PLANTILLA_EMAILJS.html`
- **Configuración actual:** `src/config/emailjs.ts`

---

**¡Sigue estos pasos y el error se solucionará! 🚀**
