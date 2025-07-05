'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// 成就数据
const achievements = [
  {
    id: 1,
    year: '2023',
    title: '全国大学生人工智能创新大赛',
    description: '获得一等奖，项目"基于深度学习的医疗影像诊断辅助系统"在准确率和实用性方面获得评委高度评价。',
  },
  {
    id: 2,
    year: '2023',
    title: 'GitHub年度贡献者',
    description: '在开源社区的活跃贡献，为多个流行库提交了超过100个PR，解决了关键性问题和功能增强。',
  },
  {
    id: 3,
    year: '2022',
    title: '中国计算机学会优秀学生奖',
    description: '因在学术研究和实践项目中的突出表现获此殊荣，展示了扎实的理论基础和创新能力。',
  },
  {
    id: 4,
    year: '2022',
    title: '科技创新奖学金',
    description: '获得学校颁发的科技创新奖学金，奖励在技术创新和应用实践方面的突出成绩。',
  },
  {
    id: 5,
    year: '2021',
    title: 'ACM-ICPC 区域赛',
    description: '作为团队成员参与ACM国际大学生程序设计竞赛，获得区域赛铜奖，展示了优秀的算法和问题解决能力。',
  },
];

export default function Achievements() {
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
  
  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }
    },
  };

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">个人成就</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 text-gray-dark dark:text-gray max-w-2xl mx-auto">
            我的学术与专业领域获奖经历和重要成就
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 时间轴 */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-accent/30"></div>
            
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                variants={itemVariants}
              >
                {/* 时间点标记 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-accent z-10 shadow-glow">
                  <div className="w-3 h-3 bg-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                </div>
                
                {/* 内容卡片 */}
                <div 
                  className={`w-5/12 bg-background dark:bg-gray-light/10 p-6 rounded-2xl shadow-lg ${
                    index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  }`}
                >
                  <div className="bg-accent/10 inline-block px-3 py-1 rounded-full text-accent text-sm font-medium mb-4">
                    {achievement.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-gray-dark dark:text-gray">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 额外成就统计 */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-gray-light dark:bg-gray-light/10 p-6 rounded-2xl">
              <h4 className="text-4xl font-bold text-accent mb-2">15+</h4>
              <p className="text-gray-dark dark:text-gray">项目经验</p>
            </div>
            <div className="bg-gray-light dark:bg-gray-light/10 p-6 rounded-2xl">
              <h4 className="text-4xl font-bold text-accent mb-2">8+</h4>
              <p className="text-gray-dark dark:text-gray">获奖经历</p>
            </div>
            <div className="bg-gray-light dark:bg-gray-light/10 p-6 rounded-2xl">
              <h4 className="text-4xl font-bold text-accent mb-2">5+</h4>
              <p className="text-gray-dark dark:text-gray">研究论文</p>
            </div>
            <div className="bg-gray-light dark:bg-gray-light/10 p-6 rounded-2xl">
              <h4 className="text-4xl font-bold text-accent mb-2">1000+</h4>
              <p className="text-gray-dark dark:text-gray">代码贡献</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 