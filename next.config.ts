import type { NextConfig } from 'next';

/**
 * Чистый клиент без бэкенда: ни API-роутов, ни серверной БД.
 * Страницы рендерятся на сервере (SSR/SSG) из статических данных в src/entities/*.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
