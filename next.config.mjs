/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // agregar aquí el host de almacenamiento de logos/imágenes (ej. Vercel Blob, Cloudinary)
    ],
  },
};

export default nextConfig;
