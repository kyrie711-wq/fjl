import type { NextConfig } from "next";

// 替换为您的GitHub用户名
const username = 'kyrie711-wq'; // 修改为正确的GitHub用户名
const repoName = 'fjl'; // 修改为您的仓库名

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // 启用静态导出
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
  images: {
    unoptimized: true, // 在静态导出中必须禁用图像优化
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
