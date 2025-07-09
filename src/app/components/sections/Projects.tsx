'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// 学习分享数据
const projects = [
  {
    id: 1,
    title: 'Web安全及漏洞挖掘',
    description: '分享Web应用安全测试方法、常见漏洞原理与利用技巧、安全防御策略等内容，包括OWASP Top 10漏洞详解和实战案例分析。',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
    tags: ['SQL注入', 'XSS', 'CSRF', '文件上传', '逻辑漏洞'],
    link: 'https://github.com/kyrie/web-security',
  },
  {
    id: 2,
    title: '内网渗透与应急响应',
    description: '探讨内网渗透技术、权限提升方法、横向移动策略，以及安全事件应急处置、日志分析和安全威胁溯源等内容。',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    tags: ['内网横向移动', '权限提升', '应急处置', '日志分析', '溯源取证'],
    link: 'https://github.com/kyrie/pentest-incident-response',
  },
  {
    id: 3,
    title: '网络安全设备运维',
    description: '分享防火墙、WAF、IDS/IPS等网络安全设备的部署、配置、优化和运维经验，帮助构建更强大的网络安全防线。',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=2070&auto=format&fit=crop',
    tags: ['防火墙配置', 'WAF规则', 'IDS/IPS', 'SIEM', '安全基线'],
    link: 'https://github.com/kyrie/security-operations',
  },
  {
    id: 4,
    title: '新兴安全产品研发',
    description: '研究云安全、容器安全、零信任架构等新兴安全领域，分享安全工具开发经验和最新安全技术研究成果。',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070&auto=format&fit=crop',
    tags: ['安全工具开发', 'API安全', '容器安全', '零信任架构', '安全自动化'],
    link: 'https://github.com/kyrie/security-products',
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
          <h2 className="text-3xl font-bold mb-2">学习分享</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 text-gray-dark dark:text-gray max-w-2xl mx-auto">
            以下是我在网络安全领域的学习笔记和研究成果分享，欢迎交流与探讨
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
            href="https://github.com/kyrie" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="apple-button"
          >
            查看更多分享
          </a>
        </motion.div>
      </div>
    </section>
  );
} 