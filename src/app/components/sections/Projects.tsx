'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// 项目数据
const projects = [
  {
    id: 1,
    title: '智能助手AI',
    description: '基于GPT-4的智能对话助手，能够回答问题、生成内容和辅助用户完成任务。使用React和Node.js构建，整合OpenAI API。',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'OpenAI API', 'TailwindCSS'],
    link: 'https://github.com/liming/ai-assistant',
  },
  {
    id: 2,
    title: '数据可视化平台',
    description: '企业级数据分析与可视化平台，支持多种图表类型和数据源。基于Python后端和Vue.js前端，实现数据实时展示和分析。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    tags: ['Python', 'Flask', 'Vue.js', 'D3.js', 'SQL'],
    link: 'https://github.com/liming/data-visualization',
  },
  {
    id: 3,
    title: '图像识别系统',
    description: '基于深度学习的图像识别系统，能够识别和分类物体、场景和人脸。使用TensorFlow和OpenCV实现，在医疗影像和安防领域有应用。',
    image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    link: 'https://github.com/liming/image-recognition',
  },
  {
    id: 4,
    title: '智慧校园App',
    description: '为高校师生提供课表查询、成绩查询、校园通知等功能的移动应用。使用React Native开发，支持iOS和Android平台。',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    tags: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    link: 'https://github.com/liming/campus-app',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }
    },
  };

  return (
    <section id="projects" className="py-20 bg-gray-light dark:bg-gray-light/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">项目作品</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 text-gray-dark dark:text-gray max-w-2xl mx-auto">
            以下是我近期开发的一些项目，展示了我在不同技术领域的能力和经验
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-background dark:bg-gray-light/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-dark dark:text-gray mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-accent hover:text-accent-light transition-colors font-medium"
                >
                  查看详情
                  <span className="ml-1">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <a 
            href="https://github.com/liming" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="apple-button"
          >
            查看更多项目
          </a>
        </motion.div>
      </div>
    </section>
  );
} 