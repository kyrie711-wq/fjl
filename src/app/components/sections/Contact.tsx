'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 这里通常会有API调用来处理表单提交
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // 5秒后重置状态
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-light dark:bg-gray-light/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">联系我</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 text-gray-dark dark:text-gray max-w-2xl mx-auto">
            如果您有任何问题或合作意向，欢迎随时联系我
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 联系表单 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-6">发送消息</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background dark:bg-gray-light/10 border border-gray/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      电子邮箱
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background dark:bg-gray-light/10 border border-gray/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    主题
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-gray-light/10 border border-gray/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    消息
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background dark:bg-gray-light/10 border border-gray/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition"
                  ></textarea>
                </div>
                
                <div>
                  <motion.button
                    type="submit"
                    className="apple-button w-full flex justify-center items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    ) : null}
                    {isSubmitting ? '发送中...' : '发送消息'}
                  </motion.button>
                  
                  {submitStatus === 'success' && (
                    <motion.p 
                      className="text-success text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      消息已发送成功！我会尽快回复您。
                    </motion.p>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.p 
                      className="text-danger text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      发送失败，请稍后重试。
                    </motion.p>
                  )}
                </div>
              </form>
            </motion.div>
            
            {/* 联系信息 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6">联系信息</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">电子邮箱</h4>
                      <a href="mailto:liming@example.com" className="text-accent hover:text-accent-light transition-colors">
                        liming@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">电话</h4>
                      <a href="tel:+8613800138000" className="text-accent hover:text-accent-light transition-colors">
                        +86 138-0013-8000
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">地址</h4>
                      <p className="text-gray-dark dark:text-gray">
                        北京市海淀区中关村大街59号
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 社交媒体链接 */}
              <div className="mt-12">
                <h4 className="text-lg font-medium mb-4">关注我</h4>
                
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/liming"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent/10 hover:bg-accent/20 text-accent p-3 rounded-full transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://linkedin.com/in/liming"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent/10 hover:bg-accent/20 text-accent p-3 rounded-full transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://twitter.com/liming"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent/10 hover:bg-accent/20 text-accent p-3 rounded-full transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://weixin.qq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent/10 hover:bg-accent/20 text-accent p-3 rounded-full transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.012.811-.03-.857-2.578.22-4.778 1.66-5.78 1.166-.808 2.707-1.253 4.337-1.253 1.979 0 3.793.685 5.052 1.772 1.393 1.206 2.156 2.808 2.156 4.52 0 3.9-3.616 7.077-8.067 7.077-.849 0-1.682-.099-2.49-.285-.071-.016-.14-.023-.207-.023-.302 0-.58.152-.782.338l-2.906 1.688a.434.434 0 00-.208.371c0 .223.174.404.388.404.035 0 .069-.004.104-.012l.115-.028 1.574-.604a.517.517 0 01.499.063c1.407.889 3.061 1.36 4.78 1.36 4.345 0 7.878-3.278 7.878-7.32 0-2.017-.877-3.88-2.464-5.214-1.47-1.244-3.44-1.929-5.549-1.929-1.962 0-3.73.606-5.04 1.714-.946.797-1.58 1.799-1.86 2.937l-.003.013c-.04.159-.07.32-.091.483-.073.579-.051 1.148.06 1.683.29 1.42 1.238 2.634 2.64 3.44l.888.492c.186.103.338.323.338.542 0 .234-.053.358-.135.48-.145.221-.39.362-.67.362-1.14 0-2.26-.342-3.201-1.002-.395-.275-.717-.543-.978-.793-1.774-1.695-2.744-3.964-2.744-6.418 0-4.954 4.522-8.989 10.078-8.989 5.567 0 10.098 4.035 10.098 8.989 0 .332-.018.664-.055.994.474.48.833 1.031 1.058 1.645.066.186.115.38.146.58.124.845-.018 1.746-.66 2.395a2.745 2.745 0 01-1.177.727c-.538.172-1.106.172-1.644-.001a2.745 2.745 0 01-1.175-.727 2.677 2.677 0 01-.696-1.32 2.736 2.736 0 01-.037-1.075c.087-.566.34-1.08.73-1.487a.197.197 0 00.054-.163 9.246 9.246 0 01-.129-1.568c0-5.427-4.997-9.841-11.14-9.841z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 