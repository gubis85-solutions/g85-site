import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import slide1 from "../assets/Slide_Show/pic1.jpg";
import separationImage from "../assets/Seperation-section/img1.png";
import execImage from "../assets/executive-message/Exec-image.jpg";
import physicalSecurityIcon from "../assets/Service-icons/Physical_Security_Service.png";
import electronicSecurityIcon from "../assets/Service-icons/Electronic_&_Digital_Security.png";
import monitoringResponseIcon from "../assets/Service-icons/Monitoring_&_Response.png";
import specialisedSecurityIcon from "../assets/Service-icons/Specialised_Security_Services.png";

export default function Home() {
  // * Core UI state for background slideshow and contact form.
   
  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);
  const [currentAboutImageIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    province: "",
    serviceInterest: "",
    productInterest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  // * Hero background images (first is the primary/pivot image).
  const backgroundImages = [
    "../assets/hero-bg.jpeg", // * Pivot image (displayed longer).
    "../assets/gubis85.png",
  ];

  // * Slideshow images for the About preview section.
  const aboutImages = [slide1];

  // * Service categories for slideshow.
  const serviceCategories = [
    {
      name: "Physical Security Services",
      icon: physicalSecurityIcon,
      link: "/services#physical-security",
    },
    {
      name: "Electronic & Digital Security",
      icon: electronicSecurityIcon,
      link: "/services#electronic-security",
    },
    {
      name: "Monitoring & Response",
      icon: monitoringResponseIcon,
      link: "/services#monitoring-response",
    },
    {
      name: "Specialised Security Services",
      icon: specialisedSecurityIcon,
      link: "/services#specialised-security",
    },
  ];

  // * Background grid animation for the hero.
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: { duration: 1.5 },
    },
  };

  // * Service slideshow auto-advance (resets on manual navigation).
  useEffect(() => {
    const serviceSlideTimeout = setTimeout(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % serviceCategories.length);
    }, 8000);

    return () => clearTimeout(serviceSlideTimeout);
  }, [currentServiceIndex, serviceCategories.length]);

  // * Navigates to the previous service.
  const prevService = () => {
    setCurrentServiceIndex(
      (prev) =>
        (prev - 1 + serviceCategories.length) % serviceCategories.length,
    );
  };

  // * Navigates to the next service.
  const nextService = () => {
    setCurrentServiceIndex((prev) => (prev + 1) % serviceCategories.length);
  };

  // * Background image slideshow.
  useEffect(() => {
    const bgSlideInterval = setInterval(
      () => {
        setCurrentBgImageIndex((prev) => {
          const nextIndex = (prev + 1) % backgroundImages.length;
          // * If moving away from pivot image (index 0), show supporting images for shorter duration.
          // * If on pivot image, stay longer before switching.
          return nextIndex;
        });
      },
      currentBgImageIndex === 0 ? 8000 : 4000,
    ); // * Pivot: 8s, other slides: 4s.

    return () => clearInterval(bgSlideInterval);
  }, [backgroundImages.length, currentBgImageIndex]);

  // * About section slideshow.

  // * Keep form state in sync with inputs.
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ? Simple form submission handler (placeholder for backend integration).
  const API_URL = (
    import.meta.env.VITE_STRAPI_URL ||
    import.meta.env.VITE_API_URL ||
    "https://g85-cms-backend-production.up.railway.app"
  ).replace(/\/+$/, "");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitSuccess("");
    setSubmitError("");

    try {
      const response = await fetch(`${API_URL}/api/contact-enquiries/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...formData,
          },
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const errorMessage =
          typeof result === "string"
            ? result
            : result?.error?.message || result?.message || "Submission failed";

        throw new Error(errorMessage);
      }

      setSubmitSuccess("Enquiry sent successfully. We will get back to you shortly.");
      setSubmitError("");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        businessName: "",
        province: "",
        serviceInterest: "",
        productInterest: "",
        message: "",
      });
    } catch (error: any) {
      const message =
        error.message || "Something went wrong. Please try again.";
      setSubmitError(message);
      setSubmitSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home">
      {/* * Animated background grid */}
      <motion.div
        className="animated-grid"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      />

      {/* * Hero section */}

      <section className="hero" aria-label="Gubis85 hero banner" />

      {/* * Company description */}
      <motion.section
        className="company-description"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="about-grid">
          <div className="about-slideshow">
            <AnimatePresence mode="sync" initial={false}>
              <motion.img
                key={currentAboutImageIndex}
                src={aboutImages[currentAboutImageIndex]}
                alt="Gubis85 operations and sites"
                className="about-slide-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
          <div className="description-container about-text-right">
            <h2 className="about-heading">
              <span className="about-heading__accent">About</span>Gubis85
            </h2>
            <p>
              Gubis85 Solutions (Pty) Ltd is a 100% black-owned,
              BBBEE-accredited security services provider established in 2013.
              With more than a decade of operational experience, the company has
              evolved into a trusted and capable security partner for national,
              provincial, and local government departments, state-owned
              entities, mining operations, and private-sector organisations
              across South Africa. The company was founded with a clear mandate
              to address critical shortcomings within the security industry by
              delivering reliable, compliant, and professionally managed
              security solutions. Since inception, Gubis85 has focused on
              building strong operational systems, investing in skilled
              personnel, and adopting technology-driven approaches that enable
              consistent service delivery in complex and high-risk environments.
            </p>
          </div>
        </div>
      </motion.section>

      {/* * What sets us apart section */}
      <div className="fun-facts-header">
        <h2 className="fun-facts-heading">
          <span className="fun-facts-heading__accent">What Sets</span> Us Apart
        </h2>
        <p className="fun-facts-subtitle">
          Gubis85 Solutions distinguishes itself through a combination of proven
          delivery capability, strong governance, and an integrated approach to
          security service provision. Our ability to operate effectively across
          diverse and high-risk environments is supported by experience, scale,
          and disciplined operational.
        </p>
        <img
          className="fun-facts-image"
          src={separationImage}
          alt="Gubis85 security capabilities"
        />
      </div>

      <div className="message-from-exec">
        <div className="message-from-exec__inner">
          <h2 className="about-heading">
            <span className="about-heading__accent">Message from the</span>
            Executive Chairman
          </h2>
          <br />
          <br />
          <br />
          <div className="message-from-exec__content">
            <div className="message-from-exec__media">
              <div className="message-from-exec__portrait">
                <img src={execImage} alt="Executive Chairman" />
              </div>
              <p className="message-from-exec__caption">
                <span style={{ fontWeight: "1000" }}>Mr Calvin Mahlangu</span>
                <br />
                <span>Founder & Executive Chairman</span>
              </p>
            </div>

            <p className="message-from-exec__text">
              Gubis85 Solutions is built on intentional leadership, operational
              discipline, and a commitment to sustainable growth. Within its
              first seven years of effective operations, the company secured
              major public-sector contracts supported by robust financial,
              digital, and operational systems. As part of our strategic
              evolution, Gubis85 has adopted the “Built to Last 2028” strategy
              positioning the organisation for long-term performance, leadership
              continuity, and enhanced stakeholder confidence. Our focus remains
              on safeguarding client assets, delivering service excellence, and
              empowering our workforce nationwide.
            </p>
          </div>
        </div>
      </div>

      {/* * Services categories section */}
      <motion.section
        className="services-categories-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>
          <span className="about-heading__accent">Our</span> Services
        </h2>
        <div className="services-categories-slideshow">
          {/* * Previous button */}
          <button
            className="slideshow-control slideshow-control--prev"
            onClick={prevService}
            aria-label="Previous service"
          >
            ←
          </button>

          <div className="slideshow-cards-container">
            {[
              (currentServiceIndex - 1 + serviceCategories.length) %
                serviceCategories.length,
              currentServiceIndex,
              (currentServiceIndex + 1) % serviceCategories.length,
            ].map((cardIndex, position) => (
              <motion.div
                key={cardIndex}
                className={`service-category-slide-wrapper ${position === 1 ? "active" : "side"}`}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: position === 1 ? 1 : 0.5,
                  scale: position === 1 ? 1 : 0.85,
                }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to={serviceCategories[cardIndex].link}
                  className="service-category-slide"
                >
                  <motion.div
                    className="service-category-image-frame"
                    whileHover={position === 1 ? { scale: 1.05, y: -8 } : {}}
                    whileTap={position === 1 ? { scale: 0.98 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src={serviceCategories[cardIndex].icon}
                      alt={serviceCategories[cardIndex].name}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* * Next button */}
          <button
            className="slideshow-control slideshow-control--next"
            onClick={nextService}
            aria-label="Next service"
          >
            →
          </button>
        </div>

        {/* * Slideshow indicators (moved below frame) */}
        <div className="slideshow-indicators">
          {serviceCategories.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === currentServiceIndex ? "active" : ""}`}
              onClick={() => setCurrentServiceIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.section>

      {/* * Features section */}
      <motion.section
        className="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>
          <span className="about-heading__accent">Why Choose</span> Gubis85?
        </h2>
        <div className="features-grid">
          {[
            {
              title: "24/7 Monitoring",
              description:
                "Round-the-clock security monitoring and rapid response protocols",
            },
            {
              title: "Expert Team",
              description:
                "Highly trained and certified security professionals",
            },
            {
              title: "Advanced Technology",
              description: "Latest AI-driven security systems and equipment",
            },
            {
              title: "Proven Track Record",
              description:
                "Years of excellence in protection and security management",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* * Get in touch form */}
      <motion.section
        id="contact-form"
        className="get-in-touch-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="form-container">
          <h2>
            <span className="about-heading__accent">Get In Touch</span> With Us
          </h2>

          {submitSuccess ? (
            <p className="form-feedback form-feedback--success">{submitSuccess}</p>
          ) : null}

          {submitError ? (
            <p className="form-feedback form-feedback--error">{submitError}</p>
          ) : null}

          <form className="contact-form" onSubmit={handleFormSubmit}>
            {/* * Name fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  placeholder="Your first name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>

            {/* * Contact fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+27 (0) XXX XXX XXXX"
                  required
                />
              </div>
            </div>

            {/* * Business name */}
            <div className="form-group full-width">
              <label htmlFor="businessName">Business Name *</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleFormChange}
                placeholder="Your business or organization name"
                required
              />
            </div>

            {/* * Province and service interest */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="province">Province *</label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Province</option>
                  <option value="gauteng">Gauteng</option>
                  <option value="western-cape">Western Cape</option>
                  <option value="kwazulu-natal">KwaZulu-Natal</option>
                  <option value="limpopo">Limpopo</option>
                  <option value="mpumalanga">Mpumalanga</option>
                  <option value="free-state">Free State</option>
                  <option value="northern-cape">Northern Cape</option>
                  <option value="eastern-cape">Eastern Cape</option>
                  <option value="north-west">North West</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="serviceInterest">Service Interest</label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleFormChange}
                >
                  <option value="">Select Service Interest</option>
                  <option value="personal">Personal Protection</option>
                  <option value="corporate">Corporate Security</option>
                  <option value="residential">Residential Security</option>
                  <option value="event">Event Security</option>
                  <option value="consulting">Consulting Services</option>
                  <option value="business-enquiry">Business Enquiry</option>
                </select>
              </div>
            </div>

            {/* * Product of interest */}
            <div className="form-group full-width">
              <label htmlFor="productInterest">Product of Interest</label>
              <select
                id="productInterest"
                name="productInterest"
                value={formData.productInterest}
                onChange={handleFormChange}
              >
                <option value="">Select Product/Service</option>
                <option value="physical-guarding">
                  Physical Guarding Security
                </option>
                <option value="surveillance">Surveillance Management</option>
                <option value="control-room">Control Room Services</option>
                <option value="access-control">Access Control System</option>
                <option value="armed-response">Reaction Armed Response</option>
                <option value="event-security">Special Event Security</option>
                <option value="vip-protection">VIP Protection</option>
                <option value="risk-assessment">
                  Security Risk Assessment
                </option>
                <option value="electric-fence">Electric Fence Solutions</option>
                <option value="intercom">Intercom System</option>
                <option value="drone">Drone Monitoring</option>
                <option value="barriers">Automatic Vehicle Barriers</option>
                <option value="biometric">Biometric Systems</option>
                <option value="bio-security">Bio Security Systems</option>
                <option value="safecall">SafeCall (Coming Soon)</option>
                <option value="offsite-monitoring">Offsite Monitoring</option>
              </select>
            </div>

            {/* * Message */}
            <div className="form-group full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Tell us more about your security requirements..."
                rows={5}
              />
            </div>

            {/* * Submit button */}
            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Sending..." : "Send Enquiry"}
            </motion.button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
