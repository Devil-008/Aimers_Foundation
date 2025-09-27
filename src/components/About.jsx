import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Award, 
  Users, 
  BookOpen, 
  Target,
  CheckCircle,
  TrendingUp,
  Clock,
  Heart
} from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const stats = [
    { number: "500+", label: "Students Enrolled", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "10+", label: "Years Experience", icon: Award },
    { number: "6+", label: "Hours Daily Classes", icon: Clock }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for academic excellence in every student, ensuring they reach their full potential."
    },
    {
      icon: Heart,
      title: "Care",
      description: "Student welfare and holistic development are at the heart of everything we do."
    },
    {
      icon: BookOpen,
      title: "Innovation",
      description: "Modern teaching methods and technology-enhanced learning for better outcomes."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive learning community where everyone thrives together."
    }
  ];

  const whyChooseUs = [
    "Experienced and qualified faculty members",
    "Comprehensive coverage of all subjects",
    "Regular assessment and progress tracking",
    "Small batch sizes for personalized attention",
    "Parent-teacher communication system",
    "Mock tests and exam preparation",
    "Flexible timing options",
    "Modern teaching methodologies"
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div 
          ref={ref}
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2>About Aimers Foundation</h2>
          <p>Empowering students with quality education and comprehensive learning solutions</p>
        </motion.div>

        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <div className="text-content">
              <h3>Our Mission</h3>
              <p>
                At Aimers Foundation, we believe every student has the potential to excel. 
                Our mission is to provide comprehensive educational support through expert guidance, 
                innovative teaching methods, and a nurturing environment that fosters both 
                academic excellence and personal growth.
              </p>
              
              <h3>Our Approach</h3>
              <p>
                We offer 6+ hour regular classes with flexible timings to accommodate different 
                schedules. Our morning (6:30-9:30 AM) and evening (6:00-9:00 PM) batches ensure 
                that quality education is accessible to all students, regardless of their daily routine.
              </p>
            </div>
          </motion.div>

          <motion.div className="stats-grid" variants={itemVariants}>
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="stat-icon">
                  <stat.icon size={32} />
                </div>
                <div className="stat-content">
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="values-section"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="values-header" variants={itemVariants}>
            <h3>Our Core Values</h3>
          </motion.div>
          
          <motion.div className="values-grid" variants={itemVariants}>
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="value-icon">
                  <value.icon size={28} />
                </div>
                <div className="value-content">
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="why-choose-section"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="why-choose-content" variants={itemVariants}>
            <div className="why-choose-text">
              <h3>Why Choose Aimers Foundation?</h3>
              <p>
                We are committed to providing exceptional educational experiences 
                that prepare students for academic success and beyond.
              </p>
            </div>
            
            <div className="why-choose-list">
              {whyChooseUs.map((reason, index) => (
                <motion.div 
                  key={index}
                  className="reason-item"
                  variants={itemVariants}
                >
                  <CheckCircle size={20} />
                  <span>{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;