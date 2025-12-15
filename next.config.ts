import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Gera a pasta 'out' com arquivos estáticos para o GitHub Pages
  images: {
    unoptimized: true, // Desativa a otimização de imagem (GitHub Pages não suporta)
  },
  // ATENÇÃO: Se o nome do seu repositório for diferente de "lucashamori.github.io"
  // (ex: se for "portfolio"), descomente a linha abaixo:
  // basePath: '/nome-do-repositorio',
};

export default nextConfig;