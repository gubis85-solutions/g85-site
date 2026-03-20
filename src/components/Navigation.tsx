import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import "../styles/Navigation.css";
import logo from "../assets/gubis85.png";
import { SOCIAL_LINKS } from "../lib/socialLinks";

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // ! TODO: Implement actual search functionality.
      console.log("Searching for:", searchQuery);
      // ? Could redirect to a search results page or filter content.
    }
  };
  return (
    <>
      {/* * Social media top bar */}
      <div className="social-top-bar">
        <div className="social-container">
          <div className="social-icons">
            <div
              className="social-icon-wrapper"
              title={SOCIAL_LINKS.facebook.handle}
            >
              <a
                href={SOCIAL_LINKS.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label={SOCIAL_LINKS.facebook.label}
              >
                <FaFacebook />
              </a>
            </div>
            <div className="social-icon-wrapper" title={SOCIAL_LINKS.x.handle}>
              <a
                href={SOCIAL_LINKS.x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label={SOCIAL_LINKS.x.label}
              >
                <FaXTwitter />
              </a>
            </div>
            <div
              className="social-icon-wrapper"
              title={SOCIAL_LINKS.linkedin.handle}
            >
              <a
                href={SOCIAL_LINKS.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label={SOCIAL_LINKS.linkedin.label}
              >
                <FaLinkedin />
              </a>
            </div>
            <div
              className="social-icon-wrapper"
              title={SOCIAL_LINKS.instagram.handle}
            >
              <a
                href={SOCIAL_LINKS.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label={SOCIAL_LINKS.instagram.label}
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* * Contact details */}
          <div className="contact-details">
            <div className="contact-item">
              <FaPhone size={14} />
              <span>086 137 7666</span>
            </div>
            <div className="contact-item">
              <FaEnvelope size={14} />
              <span>info@gubis85.co.za</span>
            </div>
          </div>

          {/* * Search bar */}
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search website..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      {/* * Main navigation bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo-wrapper">
            <Link to="/" className="nav-logo">
              <img
                src={logo}
                alt="Gubis85 Security Services"
                className="nav-logo-img"
              />
            </Link>
            <p className="nav-logo-description">
              Powered by Gubis85 Solutions (Pty) Ltd
            </p>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/careers" className="nav-link">
                Careers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/team" className="nav-link">
                Team
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link">
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/csir" className="nav-link">
                CSR
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
