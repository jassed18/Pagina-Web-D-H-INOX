# Guía para Subir a Hostinger (100% Estático - Sin Node.js)

Tu aplicación está configurada para funcionar como un **sitio web estático puro (HTML, CSS y JavaScript)**. 
**NO necesitas tener Node.js instalado en Hostinger** ni contratar un VPS costoso. Funciona en cualquier plan de Hosting Compartido de Hostinger (hPanel / cPanel).

---

## 🚀 Paso a Paso para Subir a Hostinger (El método más fácil)

### Método 1: Administrador de Archivos de Hostinger (Recomendado - 2 minutos)

1. Ingresa a tu panel de **Hostinger (hPanel)**.
2. Ve a la sección **Sitios web** y haz clic en **Administrar** en tu dominio.
3. En el menú lateral o buscador, entra a **Administrador de Archivos** (File Manager).
4. Entra a la carpeta **`public_html`**.
5. Si hay un archivo por defecto llamado `default.php` o una página en blanco de bienvenida de Hostinger, bórrala.
6. Sube **todo el contenido que está DENTRO de la carpeta `dist`**:
   - `index.html`
   - `.htaccess`
   - `logo.jpg`
   - La carpeta `assets/` (con todos sus archivos .js y .css adentro)

> ⚠️ **IMPORTANTE:** Sube lo que está **adentro** de `dist`, directamente en `public_html` (no subas la carpeta `dist` en sí, para que al abrir tudominio.com cargue de inmediato).

---

### ¿Cómo generar una nueva versión si haces cambios?

Si en el futuro haces cambios en el código en tu computadora:
1. Ejecuta:
   ```bash
   npm run build
   ```
2. Esto actualizará la carpeta `dist/` con los archivos listos para subir.
3. Vuelves a reemplazar los archivos en `public_html` de Hostinger.

---

### ¿Por qué ya no tienes problemas con rutas ni pantalla blanca?
- **Rutas Relativas (`./assets/`)**: El proyecto ahora compila con rutas relativas, lo que permite que funcione en la raíz de tu dominio o en cualquier subcarpeta.
- **Archivo `.htaccess` incluido**: Ya está preconfigurado para Apache / LiteSpeed de Hostinger para habilitar caché rápido y asegurar que todo cargue sin error 404.
