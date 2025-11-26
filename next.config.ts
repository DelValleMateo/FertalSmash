
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- ESTO ES LA CLAVE: Genera HTML estático
  images: {
    unoptimized: true, // <--- NECESARIO: Porque en modo estático Next no puede optimizar imágenes automáticamente
  },
};

export default nextConfig;