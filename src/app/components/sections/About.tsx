'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.6, 0.01, 0.05, 0.95] } 
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-light dark:bg-gray-light/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">关于我</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={ref}>
          {/* 个人照片 */}
          <motion.div 
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-accent-light/10 z-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
              alt="李明照片"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          {/* 个人介绍 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
              李明 <span className="text-accent">/ 计算机科学专业</span>
            </motion.h3>
            
            <motion.p variants={itemVariants} className="text-gray-dark dark:text-gray mb-6">
              我是一名对技术充满热情的计算机科学专业学生，专注于人工智能、机器学习和Web开发领域。我喜欢通过技术解决实际问题，创造有影响力的解决方案。
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-gray-dark dark:text-gray mb-8">
              在学习期间，我积极参与各类项目和竞赛，努力将理论知识转化为实践能力。我擅长快速学习新技术，适应不断变化的技术环境。
            </motion.p>
            
            {/* 教育背景 */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-3">教育背景</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">北京大学</h5>
                    <p className="text-sm text-gray">计算机科学与技术 - 本科</p>
                  </div>
                  <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">
                    2020 - 2024
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">清华大学</h5>
                    <p className="text-sm text-gray">人工智能 - 硕士在读</p>
                  </div>
                  <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">
                    2024 - 至今
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 