'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

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
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden" ref={heroRef}>
      {/* 背景效果 */}
      <div className="hero-bg absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-light/30 via-background to-background dark:from-gray-dark/20 dark:via-background dark:to-background"></div>
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* 内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={textRef}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="animate-text text-accent text-lg font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            你好，我是李明
          </motion.h2>
          
          <motion.h1 
            className="animate-text text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light">
              计算机科学的探索者
            </span>
          </motion.h1>
          
          <motion.p 
            className="animate-text text-lg md:text-xl text-gray-dark dark:text-gray mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            专注于人工智能和Web开发，致力于创造有意义的技术解决方案
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#projects"
              className="apple-button animate-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              查看我的项目
            </motion.a>
            
            <motion.a
              href="#contact"
              className="animate-text px-6 py-3 rounded-full border border-gray/30 hover:border-accent transition-colors duration-300"
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
            className="w-6 h-10 rounded-full border-2 border-gray flex justify-center items-start p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1 h-2 rounded-full bg-accent"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 