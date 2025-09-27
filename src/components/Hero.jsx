import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, Target } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const highlights = [
    { icon: Clock, text: "6+ Hour Regular Classes", subText: "Morning & Evening Batches" },
    { icon: BookOpen, text: "All Subjects", subText: "One Place Solution" },
    { icon: Target, text: "Clear Concepts", subText: "Practice & Mock Tests" },
    { icon: Users, text: "Student Friendly", subText: "Regular Parent Interaction" }
  ];

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Excellence in Education
            <span className="highlight"> Starts Here</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-subtitle">
            Empowering students with comprehensive learning solutions, 
            expert guidance, and a nurturing environment for academic success.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-badges">
            <div className="time-slots">
              <div className="time-slot">
                <span className="time">6:30 - 9:30 AM</span>
                <span className="label">Morning Batch</span>
              </div>
              <div className="time-slot">
                <span className="time">6:00 - 9:00 PM</span>
                <span className="label">Evening Batch</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="hero-cta">
            <motion.a 
              href="#contact" 
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(74, 144, 226, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now
            </motion.a>
            <motion.a 
              href="#services" 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-highlights"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {highlights.map((item, index) => (
            <motion.div 
              key={index}
              className="highlight-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="highlight-icon">
                <item.icon size={32} />
              </div>
              <div className="highlight-content">
                <h3>{item.text}</h3>
                <p>{item.subText}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;