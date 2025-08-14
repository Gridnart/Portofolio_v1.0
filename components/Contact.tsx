'use client';

import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Contact() {
  const socialLinks = [
    {
      name: 'Email',
      icon: <FiMail className="w-6 h-6" />,
      url: 'mailto:sahuprajval@gmail.com',
      handle: 'sahuprajval@gmail.com'
    },
    {
      name: 'GitHub',
      icon: <FiGithub className="w-6 h-6" />,
      url: 'https://github.com/Gridnart',
      handle: 'github.com/Gridnart'
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin className="w-6 h-6" />,
      url: 'https://linkedin.com/in/prajval-sahu',
      handle: 'linkedin.com/in/prajval-sahu'
    },
    {
      name: 'Twitter',
      icon: <FiTwitter className="w-6 h-6" />,
      url: 'https://twitter.com/PrajvalSah90247',
      handle: 'PrajvalSah90247'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            <span className="text-accent">03. </span>Get In Touch
          </h2>
          
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi,
            I&apos;ll do my best to get back to you!
          </p>
          
          <motion.a
            href="mailto:sahuprajval2@gmail.com"
            className="btn btn-primary inline-block mb-16"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Say Hello
          </motion.a>
          
          <div className="border-t border-accent/20 pt-12">
            <h3 className="text-xl font-heading mb-8 text-accent">Find me on</h3>
            
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 rounded-full bg-card border border-accent/20 flex items-center justify-center mb-2 group-hover:bg-accent/10 transition-colors duration-300">
                    <span className="text-accent">{social.icon}</span>
                  </div>
                  <span className="text-sm mt-2">{social.name}</span>
                  <span className="text-xs text-text/60">{social.handle}</span>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-accent/10">
            <p className="text-sm text-text/60">
              Designed & Built by Prajval Sahu © {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
