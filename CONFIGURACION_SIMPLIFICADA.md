# 🎯 Configuración Simplificada de EmailJS

## ✅ **Parámetros Simplificados**

Tu plantilla de EmailJS debe usar **SOLO** estos 4 parámetros:

```html
{{email}}         <!-- Email del usuario -->
{{nombre}}        <!-- Nombre del usuario -->
{{edificio}}      <!-- Nombre del edificio -->
{{descripcion}}   <!-- Descripción del proyecto -->
```

## 🔧 **Paso a Paso**

### 1. **Actualizar tu Plantilla en EmailJS**

1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Inicia sesión
3. Ve a "Email Templates"
4. Abre tu plantilla `template_xvcga3t`
5. **Reemplaza todo el contenido** con el código de `PLANTILLA_SIMPLE.html`
6. **Guarda la plantilla**

### 2. **Verificar que la Plantilla Use las Variables Correctas**

Tu plantilla debe tener exactamente estas líneas:

```html
<span>{{nombre}}</span>           <!-- Para el nombre -->
<span>{{email}}</span>            <!-- Para el email -->
<span>{{edificio}}</span>         <!-- Para el edificio -->
<div>{{descripcion}}</div>        <!-- Para la descripción -->
```

### 3. **Probar con la Página de Prueba**

1. Abre `test-emailjs.html` en tu navegador
2. Llena el formulario
3. Haz clic en "Enviar Email de Prueba"
4. Verifica que funcione sin errores

## 📋 **Mapeo de Campos**

| Campo del Formulario | Variable EmailJS | Descripción |
|---------------------|------------------|-------------|
| `nombre`            | `{{nombre}}`     | Nombre del usuario |
| `email`             | `{{email}}`      | Email del usuario |
| `empresa`           | `{{edificio}}`   | Nombre del edificio |
| `mensaje`           | `{{descripcion}}`| Descripción del proyecto |

## 🚨 **Errores Comunes**

### **Error: "Invalid template parameters"**
- **Causa:** Tu plantilla tiene variables diferentes
- **Solución:** Usar exactamente `{{email}}`, `{{nombre}}`, `{{edificio}}`, `{{descripcion}}`

### **Error: "Template not found"**
- **Causa:** Template ID incorrecto
- **Solución:** Verificar que sea `template_xvcga3t`

### **Error: "Service not found"**
- **Causa:** Service ID incorrecto
- **Solución:** Verificar que sea `service_1yf4l18`

## 🧪 **Prueba Rápida**

### **En la Consola del Navegador:**
```javascript
// Verificar que EmailJS esté disponible
console.log('EmailJS disponible:', typeof window.emailjs !== 'undefined');

// Probar envío manual
emailjs.send(
  'service_1yf4l18',
  'template_xvcga3t',
  {
    email: 'test@test.com',
    nombre: 'Test User',
    edificio: 'Test Building',
    descripcion: 'Test description'
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

## 📁 **Archivos Importantes**

- ✅ `PLANTILLA_SIMPLE.html` - Plantilla con 4 parámetros
- ✅ `test-emailjs.html` - Página de prueba actualizada
- ✅ `src/config/emailjs.ts` - Configuración simplificada

## 🎯 **Resumen de Cambios**

1. **Eliminamos variables innecesarias** (fecha, hora, reply_to, etc.)
2. **Usamos solo 4 parámetros** que tu plantilla necesita
3. **Simplificamos el código** para evitar errores
4. **Creamos plantilla simple** que funciona

## ✅ **Después de la Configuración**

- Tu formulario enviará emails correctamente
- Solo se enviarán los 4 campos necesarios
- No habrá errores de "Invalid template parameters"
- Los emails llegarán a `ascendia.assistance@gmail.com`

---

**¡Con esta configuración simplificada, el error 400 se solucionará inmediatamente! 🚀**
