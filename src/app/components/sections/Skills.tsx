'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import gsap from 'gsap';

// 技能数据
const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'React', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'TensorFlow', level: 75 },
  { name: 'SQL', level: 78 },
  { name: 'TypeScript', level: 82 },
  { name: 'Java', level: 70 },
];

// 技术栈数据
const techStack = [
  { name: 'Web开发', items: ['React', 'Next.js', 'TailwindCSS', 'Node.js', 'Express'] },
  { name: '人工智能', items: ['TensorFlow', 'PyTorch', 'Scikit-Learn', '自然语言处理', '计算机视觉'] },
  { name: '云服务与部署', items: ['AWS', 'Docker', 'CI/CD', 'GitHub Actions', 'Vercel'] },
  { name: '数据科学', items: ['数据分析', 'Pandas', 'NumPy', '数据可视化', 'Jupyter'] },
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
              编程语言 & 框架
            </motion.h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
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
              技术栈
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {techStack.map((tech, index) => (
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