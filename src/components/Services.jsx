import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Zap, 
  BookMarked, 
  Target, 
  FileText, 
  Heart, 
  MessageCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const services = [
    {
      icon: Clock,
      title: "6+ Hour Regular Classes",
      description: "Comprehensive daily sessions with flexible timing options to suit your schedule.",
      features: ["Morning: 6:30 - 9:30 AM", "Evening: 6:00 - 9:00 PM", "Daily Practice Sessions"]
    },
    {
      icon: Zap,
      title: "Fast-Track Revision",
      description: "Intensive revision programs designed to maximize retention and exam performance.",
      features: ["Quick Concept Review", "Important Topics Focus", "Time-Efficient Learning"]
    },
    {
      icon: BookMarked,
      title: "All Subjects in One Place",
      description: "Complete academic solution covering all subjects under one roof.",
      features: ["Mathematics", "Science", "English", "Social Studies"]
    },
    {
      icon: Target,
      title: "Clear Concepts & Practice",
      description: "Focus on conceptual clarity with extensive practice sessions.",
      features: ["Concept Building", "Problem Solving", "Doubt Clearing"]
    },
    {
      icon: FileText,
      title: "Mock Tests & Assessments",
      description: "Regular testing to track progress and identify improvement areas.",
      features: ["Weekly Tests", "Performance Analysis", "Improvement Strategies"]
    },
    {
      icon: Heart,
      title: "Student-Friendly Environment",
      description: "Nurturing and supportive atmosphere that encourages learning and growth.",
      features: ["Personalized Attention", "Comfortable Learning Space", "Peer Support"]
    },
    {
      icon: MessageCircle,
      title: "Parent-Teacher Interaction",
      description: "Regular communication with parents to ensure student progress and development.",
      features: ["Progress Reports", "Parent Meetings", "Feedback Sessions"]
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <motion.div 
          ref={ref}
          className="services-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Premium Services</h2>
          <p>Comprehensive educational solutions designed for your success</p>
        </motion.div>
        
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="service-icon">
                <service.icon size={40} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;