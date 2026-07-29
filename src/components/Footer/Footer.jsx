import "./Footer.css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-column">
          <h2>Qizar Solutions</h2>

          <p>
            Empowering businesses with innovative software,
            AI, cloud, and digital transformation solutions.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>

          <p><FaPhoneAlt /> +91 XXXXX XXXXX</p>

          <p><FaEnvelope /> info@qizarsolutions.com</p>

          <p><FaMapMarkerAlt /> Noida, Uttar Pradesh</p>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaLinkedinIn /></a>

            <a href="#"><FaInstagram /></a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Qizar Solutions. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;