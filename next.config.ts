import type { NextConfig } from "next";

// 替换为您的GitHub用户名
const username = 'liming'; // 请修改为你的GitHub用户名

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // 启用静态导出
  basePath: process.env.NODE_ENV === 'production' ? `/${username}.github.io` : '',
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
