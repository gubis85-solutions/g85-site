import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../lib/socialLinks";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Gubis85 Security Service</h3>
          <p>Your trusted security partner</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/csir">CSIR</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            <i>Boitumelo Mahlangu Coporate House</i>
          </p>
          <p>254 Lochner Rd, Celtisdal, Centurion, 0157</p>
          <p>086 137 7666</p>
          <p>info@gubis85security.com</p>
        </div>
        <div className="footer-section footer-section--social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <div className="social-icon-wrapper">
              <a
                href={SOCIAL_LINKS.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.facebook.label}
                title={SOCIAL_LINKS.facebook.handle}
                className="social-icon-btn"
              >
                <FaFacebook />
              </a>
            </div>
            <div className="social-icon-wrapper">
              <a
                href={SOCIAL_LINKS.x.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.x.label}
                title={SOCIAL_LINKS.x.handle}
                className="social-icon-btn"
              >
                <FaXTwitter />
              </a>
            </div>
            <div className="social-icon-wrapper">
              <a
                href={SOCIAL_LINKS.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.linkedin.label}
                title={SOCIAL_LINKS.linkedin.handle}
                className="social-icon-btn"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="social-icon-wrapper">
              <a
                href={SOCIAL_LINKS.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.instagram.label}
                title={SOCIAL_LINKS.instagram.handle}
                className="social-icon-btn"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom__inner">
          <p className="footer-bottom__copy">
            &copy; 2026 Gubis85 Security Service. All rights reserved.
          </p>
          <p className="footer-bottom__signature">
            designed by PRINCETON TECHOLOGIES PTY(LTD)
          </p>
        </div>
      </div>
    </footer>
  );
}
