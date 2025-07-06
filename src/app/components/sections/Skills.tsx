'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import gsap from 'gsap';

// 技能数据
const skills = [
  { name: 'Web渗透测试', level: 90 },
  { name: 'OWASP Top 10', level: 88 },
  { name: 'Python安全开发', level: 85 },
  { name: '内网渗透', level: 82 },
  { name: '应急响应', level: 80 },
  { name: '安全设备运维', level: 78 },
  { name: '安全产品开发', level: 75 },
  { name: '安全合规审计', level: 72 },
];

// 技术栈数据
const techStack = [
  { name: 'Web安全及漏洞挖掘', items: ['SQL注入', 'XSS/CSRF', '文件上传', 'XXE', '逻辑漏洞', '漏洞扫描工具'] },
  { name: '内网渗透与应急响应', items: ['横向移动', '权限提升', '域渗透', '应急处置', '日志分析', '溯源取证'] },
  { name: '网络安全设备运维', items: ['WAF配置', '防火墙管理', 'IDS/IPS', '安全基线', 'SIEM部署', '安全策略'] },
  { name: '新兴安全产品研发', items: ['安全工具开发', 'API安全', '容器安全', '云安全防护', '安全自动化', '零信任架构'] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // 只有在视图中时才执行动画
    if (isInView && skillsRef.current) {
      const bars = skillsRef.current.querySelectorAll('.skill-bar-fill');
      
      bars.forEach((bar: Element) => {
        const target = bar as HTMLElement;
        const level = target.getAttribute('data-level') || '0';
        
        gsap.fromTo(
          target,
          { width: 0 },
          { 
            width: level + '%',
            duration: 1.5,
            ease: "power3.out"
          }
        );
      });
    }
  }, [isInView]);
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">专业技能</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 技能条 */}
          <div ref={skillsRef}>
            <motion.h3 
              className="text-2xl font-semibold mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              安全技术 & 能力
            </motion.h3>
            
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-accent">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-light rounded-full overflow-hidden">
                    <div 
                      className="skill-bar-fill h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 技术栈 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-8"
              variants={itemVariants}
            >
              安全领域
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {techStack.map((tech) => (
                <motion.div 
                  key={tech.name}
                  className="bg-gray-light dark:bg-gray-light/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                >
                  <h4 className="text-lg font-semibold mb-4 text-accent">{tech.name}</h4>
                  <ul className="space-y-2">
                    {tech.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 