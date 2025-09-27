import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Aimers Foundation</h3>
            <p>
              Empowering students with quality education, comprehensive learning solutions, 
              and a supportive environment for academic excellence.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <Mail size={18} />
                <a href="mailto:foundationaimers@gmail.com">foundationaimers@gmail.com</a>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <div className="phone-numbers">
                  <a href="tel:6296161065">6296161065</a>
                  <span>/</span>
                  <a href="tel:9382423302">9382423302</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Class Timings</h4>
            <div className="timings">
              <div className="timing-item">
                <strong>Morning Batch</strong>
                <span>6:30 AM - 9:30 AM</span>
              </div>
              <div className="timing-item">
                <strong>Evening Batch</strong>
                <span>6:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Our Commitment</h4>
            <ul className="commitment-list">
              <li>✓ Quality Education</li>
              <li>✓ Individual Attention</li>
              <li>✓ Regular Progress Updates</li>
              <li>✓ Parent Involvement</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p>
              © {currentYear} Aimers Foundation. All rights reserved. 
              <span className="made-with">
                Made with <Heart size={14} color="#ff6b6b" fill="#ff6b6b" /> for education
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;