# 📧 Sistema de Emails - Ascendia (EmailJS)

## 🎯 ¿Qué hace?

Cuando alguien completa el formulario de contacto, automáticamente se envía un email con toda la información a **ascendia.assistance@gmail.com**.

## 🚀 Configuración en 3 pasos

### 1. Crear cuenta en EmailJS
- Ve a [EmailJS.com](https://www.emailjs.com/)
- Regístrate gratis
- Confirma tu email

### 2. Obtener las 3 claves necesarias
1. **Public Key**: Account → API Keys
2. **Service ID**: Email Services → Gmail
3. **Template ID**: Email Templates → Nueva plantilla

### 3. Configurar el código
```bash
# Copiar archivo de ejemplo
cp src/config/emailjs.example.ts src/config/emailjs.ts

# Editar con tus claves
# PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID
```

## 📁 Archivos importantes

- `src/components/Contact.tsx` - Formulario con envío de emails
- `src/config/emailjs.ts` - Configuración de EmailJS (crear desde ejemplo)
- `INSTRUCCIONES_EMAILJS.md` - Guía completa paso a paso

## ✅ Ventajas

- 🚫 **Sin backend** - No necesitas servidor
- 💰 **Gratis** - 200 emails/mes
- ⚡ **Rápido** - Configuración en 5 minutos
- 🔒 **Seguro** - Autenticación OAuth con Gmail

## 🧪 Probar

1. Configura las 3 claves
2. Abre tu sitio web
3. Llena el formulario
4. Verifica que llegue el email

## 📞 Soporte

- **Documentación**: [INSTRUCCIONES_EMAILJS.md](INSTRUCCIONES_EMAILJS.md)
- **EmailJS**: [www.emailjs.com](https://www.emailjs.com/)

---

**¡Listo! Tu formulario enviará emails automáticamente sin complicaciones.**
