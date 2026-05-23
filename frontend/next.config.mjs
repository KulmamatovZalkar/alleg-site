/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
      { protocol: "http", hostname: "backend", port: "8000", pathname: "/media/**" },
      { protocol: "http", hostname: "nginx", pathname: "/media/**" },
      { protocol: "https", hostname: "**" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Меньшие шаги в нижней части шкалы, чтобы для мелких слотов
    // на мобиле выбирался не «самый большой из стандартных» 640w,
    // а 320/384/480.
    deviceSizes: [320, 384, 480, 640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
