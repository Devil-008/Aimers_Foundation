import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { googleSheetsService, validateFormData } from '../services/googleSheets';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    fieldErrors: {}
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formStatus.fieldErrors[name]) {
      setFormStatus(prev => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          [name]: null
        }
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
      fieldErrors: {}
    });

    try {
      // Validate form data
      const validation = validateFormData(formData);
      
      if (!validation.isValid) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          error: 'Please correct the errors below',
          fieldErrors: validation.errors
        });
        return;
      }

      // Check for duplicates
      const isDuplicate = await googleSheetsService.checkDuplicate(formData.email, formData.phone);
      
      if (isDuplicate) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          error: 'An application with this email or phone number already exists. Please contact us directly if you need assistance.',
          fieldErrors: {}
        });
        return;
      }

      // Submit form
      const result = await googleSheetsService.submitForm(formData);
      
      if (result.success) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          error: null,
          fieldErrors: {}
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          grade: '',
          message: ''
        });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({ ...prev, isSubmitted: false }));
        }, 5000);
        
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error.message || 'Failed to submit form. Please try again or contact us directly.',
        fieldErrors: {}
      });
    }
  };

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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "foundationaimers@gmail.com",
      action: "mailto:foundationaimers@gmail.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "6296161065 / 9382423302",
      action: "tel:6296161065"
    },
    {
      icon: Clock,
      title: "Class Timings",
      info: "6:30-9:30 AM & 6:00-9:00 PM",
      action: null
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div 
          ref={ref}
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Get in Touch</h2>
          <p>Ready to start your educational journey? Contact us today!</p>
        </motion.div>
        
        <motion.div 
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="contact-info" variants={itemVariants}>
            <h3>Contact Information</h3>
            <div className="info-cards">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="info-card"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="info-icon">
                    <item.icon size={28} />
                  </div>
                  <div className="info-content">
                    <h4>{item.title}</h4>
                    {item.action ? (
                      <a href={item.action} className="info-link">
                        {item.info}
                      </a>
                    ) : (
                      <p>{item.info}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            <div className="contact-form">
              <h3>Send us a Message</h3>
              
              {/* Success Message */}
              {formStatus.isSubmitted && (
                <motion.div 
                  className="form-success"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle size={20} />
                  <span>Thank you! Your message has been sent successfully. We'll contact you soon.</span>
                </motion.div>
              )}
              
              {/* Error Message */}
              {formStatus.error && !formStatus.isSubmitted && (
                <motion.div 
                  className="form-error"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <AlertCircle size={20} />
                  <span>{formStatus.error}</span>
                </motion.div>
              )}
              
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    className={`form-input ${formStatus.fieldErrors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    disabled={formStatus.isSubmitting}
                  />
                  {formStatus.fieldErrors.name && (
                    <span className="field-error">{formStatus.fieldErrors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email" 
                    className={`form-input ${formStatus.fieldErrors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    disabled={formStatus.isSubmitting}
                  />
                  {formStatus.fieldErrors.email && (
                    <span className="field-error">{formStatus.fieldErrors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Your Phone (10 digits)" 
                    className={`form-input ${formStatus.fieldErrors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    disabled={formStatus.isSubmitting}
                  />
                  {formStatus.fieldErrors.phone && (
                    <span className="field-error">{formStatus.fieldErrors.phone}</span>
                  )}
                </div>
                <div className="form-group">
                  <select 
                    name="grade"
                    className={`form-input ${formStatus.fieldErrors.grade ? 'error' : ''}`}
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus.isSubmitting}
                  >
                    <option value="">Select Grade Level</option>
                    <option value="grade-6">Grade 6</option>
                    <option value="grade-7">Grade 7</option>
                    <option value="grade-8">Grade 8</option>
                    <option value="grade-9">Grade 9</option>
                    <option value="grade-10">Grade 10</option>
                    <option value="grade-11">Grade 11</option>
                    <option value="grade-12">Grade 12</option>
                  </select>
                  {formStatus.fieldErrors.grade && (
                    <span className="field-error">{formStatus.fieldErrors.grade}</span>
                  )}
                </div>
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Your Message (minimum 10 characters)" 
                    className={`form-input form-textarea ${formStatus.fieldErrors.message ? 'error' : ''}`}
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus.isSubmitting}
                  ></textarea>
                  {formStatus.fieldErrors.message && (
                    <span className="field-error">{formStatus.fieldErrors.message}</span>
                  )}
                </div>
                <motion.button 
                  type="submit" 
                  className={`btn-primary form-submit ${formStatus.isSubmitting ? 'submitting' : ''}`}
                  whileHover={!formStatus.isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!formStatus.isSubmitting ? { scale: 0.95 } : {}}
                  disabled={formStatus.isSubmitting || formStatus.isSubmitted}
                >
                  {formStatus.isSubmitting ? (
                    <>
                      <Loader size={18} className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="contact-cta"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="cta-content">
            <h3>Ready to Excel in Your Studies?</h3>
            <p>Join hundreds of successful students who have achieved their academic goals with us.</p>
            <div className="cta-buttons">
              <motion.a 
                href="tel:6296161065" 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call Now: 6296161065
              </motion.a>
              <motion.a 
                href="tel:9382423302" 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Alt: 9382423302
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;