'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

// 定义星星位置类型
type StarPosition = {
  width: number;
  height: number;
  left: string;
  top: string;
  opacity: number;
  boxShadow: string;
};

// 定义动态星星位置类型
type AnimatedStarPosition = {
  size: number;
  left: string;
  top: string;
  delay: number;
};

// 预生成固定的星星位置数据，避免服务端与客户端渲染不匹配
const starPositions: StarPosition[] = Array.from({ length: 50 }).map((_, i) => ({
  width: 1 + (i % 3) * 0.8,
  height: 1 + ((i + 1) % 3) * 0.7,
  left: `${(i * 7.3) % 100}%`,
  top: `${(i * 11.7) % 100}%`,
  opacity: 0.2 + ((i % 5) / 10),
  boxShadow: `0 0 ${1 + (i % 3)}px rgba(0, 168, 255, 0.6)`
}));

// 预生成动态星星的位置
const animatedStarPositions: AnimatedStarPosition[] = Array.from({ length: 15 }).map((_, i) => ({
  size: 1 + (i % 4),
  left: `${(i * 13.7) % 100}%`,
  top: `${(i * 9.3) % 100}%`,
  delay: i * 100
}));

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // 视差滚动效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 20;
      const y = (clientY - window.innerHeight / 2) / 20;
      
      gsap.to(heroRef.current.querySelector('.hero-bg'), {
        x: x * -1,
        y: y * -1,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.to(heroRef.current.querySelectorAll('.star'), {
        x: x * -0.5,
        y: y * -0.5,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 文字渐入动画
  useEffect(() => {
    if (!textRef.current) return;
    
    gsap.fromTo(
      textRef.current.querySelectorAll('.animate-text'),
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 1, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
    
    // 创建动态星星效果 - 仅在客户端执行
    if (typeof window !== 'undefined') {
      const createStar = (position: AnimatedStarPosition) => {
        if(!heroRef.current) return;
        
        const star = document.createElement('div');
        star.className = 'animate-star';
        
        star.style.width = `${position.size}px`;
        star.style.height = `${position.size}px`;
        
        star.style.left = position.left;
        star.style.top = position.top;
        star.style.opacity = '0';
        star.style.boxShadow = `0 0 ${position.size * 2}px ${position.size / 2}px rgba(0, 168, 255, 0.6)`;
        star.style.backgroundColor = '#00a8ff';
        star.style.borderRadius = '50%';
        star.style.position = 'absolute';
        
        heroRef.current.querySelector('.star-container')?.appendChild(star);
        
        gsap.to(star, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 2 + 1,
          repeat: 1,
          yoyo: true,
          onComplete: () => {
            star.remove();
            setTimeout(() => createStar(position), Math.random() * 3000 + 1000);
          }
        });
      };
      
      // 初始创建多个星星
      animatedStarPositions.forEach((position) => {
        setTimeout(() => createStar(position), position.delay);
      });
    }
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden" ref={heroRef}>
      {/* 背景图片和效果 */}
      <div className="hero-bg absolute inset-0 z-0">
        {/* 主背景 - 星空背景图 */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=3540&auto=format&fit=crop"
            alt="深蓝科幻背景"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        
        {/* 深色遮罩，确保文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a20]/90 via-[#050a20]/70 to-[#050a20]/90"></div>
        
        {/* 星星容器 */}
        <div className="star-container absolute inset-0 overflow-hidden"></div>
        
        {/* 固定星星点点 - 使用预生成的固定位置 */}
        <div className="absolute inset-0 overflow-hidden">
          {starPositions.map((star, i) => (
            <div 
              key={i} 
              className="star absolute rounded-full bg-blue-400" 
              style={{
                width: `${star.width}px`,
                height: `${star.height}px`,
                left: star.left,
                top: star.top,
                opacity: star.opacity,
                boxShadow: star.boxShadow
              }}
            ></div>
          ))}
        </div>
        
        {/* 科技感图形元素 */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-[#00a8ff]/15 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-[#00a8ff]/8 rounded-full scale-125"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-[#00a8ff]/4 rounded-full scale-150"></div>
        
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 border border-[#00a8ff]/15 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 border border-[#00a8ff]/8 rounded-full scale-125"></div>
        
        {/* 光束效果 */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#00a8ff]/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00a8ff]/15 to-transparent"></div>
        
        {/* 科技线条 */}
        <div className="absolute inset-0 opacity-8" 
             style={{
               backgroundImage: 'linear-gradient(to right, rgba(0, 168, 255, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 168, 255, 0.07) 1px, transparent 1px)',
               backgroundSize: '30px 30px',
             }}>
        </div>
        
        {/* 霓虹辉光 */}
        <div className="absolute top-1/2 right-1/3 w-64 h-1 bg-[#00a8ff]/20 blur-xl transform -rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-1 bg-[#00d2ff]/15 blur-xl transform rotate-30"></div>
      </div>
      
      {/* 内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={textRef}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="animate-text text-[#00d2ff]/70 text-lg font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            你好，我是kyrie
          </motion.h2>
          
          <motion.h1 
            className="animate-text text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a8ff]/85 to-[#00d2ff]/85">
              网络安全爱好者
            </span>
          </motion.h1>
          
          <motion.p 
            className="animate-text text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            专注于Web安全、内网渗透、安全响应与安全产品研发
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#projects"
              className="bg-[#00a8ff]/85 text-white/95 apple-button animate-text hover:bg-[#00d2ff]/85"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              学习分享
            </motion.a>
            
            <motion.a
              href="#contact"
              className="animate-text px-6 py-3 rounded-full border border-[#00a8ff]/20 hover:border-[#00a8ff]/40 transition-colors duration-300 text-white/85 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              联系我
            </motion.a>
          </div>
        </div>
        
        {/* 向下滚动指示 */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-[#00a8ff]/30 flex justify-center items-start p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1 h-2 rounded-full bg-[#00a8ff]/70"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 