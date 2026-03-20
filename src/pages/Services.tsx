import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaBolt,
  FaCrown,
  FaCalendarAlt,
  FaKey,
  FaVideo,
  FaSlidersH,
  FaChartBar,
  FaPhoneAlt,
  FaCamera,
  FaCarSide,
  FaSyncAlt,
  FaRoad,
  FaFingerprint,
  FaGlobe,
  FaLock,
  FaMobile,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import "../styles/Services.css";
import "../styles/Services.css";

export default function Services() {
  // * Tracks which service card is flipped open.
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  // * Toggles the flip state for a given card.
  const handleCardToggle = (id: number) => {
    setFlippedCardId((current) => (current === id ? null : id));
  };

  // * Physical security services.
  const physicalSecurityServices = [
    {
      id: 1,
      slug: "physical-guarding",
      title: "Physical Guarding",
      icon: FaShieldAlt,
      summary:
        "Trained, visible presence that deters threats and protects people onsite.",
      bullets: [
        "Disciplined on-site security teams with clear escalation protocols.",
        "Routine patrols, perimeter checks, and access verification.",
        "Immediate response to incidents to safeguard assets and staff.",
      ],
      impact:
        "Creates a strong physical deterrent and a calm, secure environment for daily operations.",
    },
    {
      id: 3,
      slug: "vip-protection",
      title: "VIP Protection",
      icon: FaCrown,
      summary: "Discreet close protection with precision movement planning.",
      bullets: [
        "Low-profile teams focused on privacy and confidence.",
        "Secure route planning and travel risk management.",
        "Dedicated liaison to coordinate security logistics.",
      ],
      impact:
        "Ensures high-profile clients move safely without operational disruption.",
    },
    {
      id: 4,
      slug: "event-security",
      title: "Special Event Security",
      icon: FaCalendarAlt,
      summary: "Structured crowd control and safe event operations.",
      bullets: [
        "Crowd flow planning, access management, and zone control.",
        "VIP protection and secure backstage operations.",
        "Emergency response readiness and incident coordination.",
      ],
      impact: "Keeps guests safe while maintaining a premium event experience.",
    },
    {
      id: 5,
      slug: "armed-response",
      title: "Reaction Armed Response",
      icon: FaBolt,
      summary:
        "Rapid response teams that act immediately to threats and alarms.",
      bullets: [
        "Fast deployment aligned to alarm activation protocols.",
        "Professional armed units trained for de-escalation.",
        "Incident stabilization and handover procedures.",
      ],
      impact:
        "Delivers confidence that critical incidents are contained quickly.",
    },
  ];

  // * Electronic and digital security services.
  const electronicSecurityServices = [
    {
      id: 7,
      slug: "surveillance",
      title: "Surveillance Management (CCTV)",
      icon: FaVideo,
      summary:
        "Live monitoring and intelligence for proactive threat detection.",
      bullets: [
        "Continuous monitoring of critical indoor and outdoor zones.",
        "Event-driven alerts for rapid response.",
        "Integration with control room and mobile teams.",
      ],
      impact: "Improves awareness and reduces blind spots across sites.",
    },
    {
      id: 6,
      slug: "access-control",
      title: "Access Control Systems",
      icon: FaKey,
      summary:
        "Granular entry controls for secure premises and sensitive zones.",
      bullets: [
        "Custom permissions for staff, visitors, and contractors.",
        "Audit-ready access logs and reporting.",
        "Scalable systems that grow with your operation.",
      ],
      impact:
        "Reduces unauthorized access while keeping traffic moving smoothly.",
    },
    {
      id: 15,
      slug: "biometric",
      title: "Biometric Systems",
      icon: FaFingerprint,
      summary: "High-security access through identity verification.",
      bullets: [
        "Fingerprint and biometric entry validation.",
        "Prevents credential sharing and tailgating.",
        "Audit-ready reporting for compliance.",
      ],
      impact: "Provides accurate access control for restricted areas.",
    },
    {
      id: 2,
      slug: "electric-fence",
      title: "Electric Fencing",
      icon: FaBolt,
      summary:
        "High-voltage perimeter defense engineered for critical boundaries.",
      bullets: [
        "Free-standing or palisade-integrated fence options.",
        "Early-warning triggers for boundary breaches.",
        "Strong deterrence for high-risk zones and remote sites.",
      ],
      impact:
        "Reduces intrusion risk by creating a visible and monitored perimeter shield.",
    },
    {
      id: 10,
      slug: "intercom",
      title: "Intercom Systems",
      icon: FaPhoneAlt,
      summary: "Secure visitor communication and access verification.",
      bullets: [
        "Video and remote access at control points.",
        "Two-way communication for faster verification.",
        "Seamless integration with access control.",
      ],
      impact: "Improves visitor screening and reduces entry friction.",
    },
    {
      id: 12,
      slug: "vehicle-barriers",
      title: "Automatic Vehicle Barriers",
      icon: FaCarSide,
      summary: "Controlled vehicle access with rapid open-close cycles.",
      bullets: [
        "Managed entry for delivery and logistics zones.",
        "High-durability systems for frequent use.",
        "Integrated authorization and access logs.",
      ],
      impact: "Controls traffic flow while protecting critical entry points.",
    },
  ];

  // * Monitoring and response services.
  const monitoringResponseServices = [
    {
      id: 8,
      slug: "control-room",
      title: "24/7 Control Room Operations",
      icon: FaSlidersH,
      summary: "Central command hubs for real-time oversight and coordination.",
      bullets: [
        "Unified monitoring across cameras, alarms, and access control.",
        "Incident escalation and dispatch coordination.",
        "Client reporting and operational dashboards.",
      ],
      impact: "Accelerates decision-making and boosts response efficiency.",
    },
    {
      id: 19,
      slug: "offsite-monitoring",
      title: "Offsite Monitoring",
      icon: FaGlobe,
      summary: "Remote oversight of alarms, cameras, and alerts 24/7.",
      bullets: [
        "Central monitoring with rapid incident response.",
        "Continuous protection for unattended sites.",
        "Escalation workflows with field teams.",
      ],
      impact: "Ensures coverage even when locations are unoccupied.",
    },
    {
      id: 11,
      slug: "drone-monitoring",
      title: "Drone Monitoring",
      icon: FaCamera,
      summary: "Aerial surveillance for expansive or high-risk terrain.",
      bullets: [
        "Wide-area visibility for large properties.",
        "Real-time intelligence for fast response.",
        "Early detection of perimeter and environmental risks.",
      ],
      impact: "Extends visibility beyond ground-level monitoring.",
    },
  ];

  // * Specialised security services.
  const specialisedSecurityServices = [
    {
      id: 9,
      slug: "risk-assessment",
      title: "Security Risk Assessment",
      icon: FaChartBar,
      summary: "Structured threat analysis to reduce vulnerabilities.",
      bullets: [
        "Site risk profiling and vulnerability mapping.",
        "Actionable mitigation strategies and policy guidance.",
        "Compliance-focused reporting for leadership teams.",
      ],
      impact: "Transforms risk data into clear, prioritised security action.",
    },
    {
      id: 17,
      slug: "riot-control",
      title: "Riot Control",
      icon: FaUsers,
      summary:
        "Planned crowd management and escalation control for volatile environments.",
      bullets: [
        "Specialised teams trained in crowd dynamics and de-escalation.",
        "Coordinated response planning with site leadership.",
        "Protects people, assets, and continuity during unrest.",
      ],
      impact:
        "Restores safety and stability while reducing operational disruption.",
    },
    {
      id: 16,
      slug: "forensics",
      title: "Forensics",
      icon: FaSearch,
      summary:
        "Structured investigations to preserve evidence and resolve incidents quickly.",
      bullets: [
        "On-site evidence collection and secure chain-of-custody handling.",
        "Incident analysis and reporting for legal or internal action.",
        "Coordination with stakeholders and authorities as needed.",
      ],
      impact:
        "Delivers clear, defensible findings that support rapid resolution.",
    },
    {
      id: 13,
      slug: "turnstile",
      title: "Turnstile Systems",
      icon: FaSyncAlt,
      summary: "Regulated pedestrian flow with secure verification.",
      bullets: [
        "Biometric-ready entry management.",
        "High-throughput flow without sacrificing security.",
        "Reliable for offices, plants, and campuses.",
      ],
      impact: "Keeps entry points secure while reducing congestion.",
    },
    {
      id: 14,
      slug: "roadway-spikes",
      title: "Roadway Spikes",
      icon: FaRoad,
      summary: "One-way vehicle deterrent for sensitive zones.",
      bullets: [
        "Durable design for heavy traffic conditions.",
        "Stops unauthorized entry without slowing exit.",
        "Ideal for gated estates and facilities.",
      ],
      impact: "Adds a simple, effective deterrent for vehicle threats.",
    },
    {
      id: 20,
      slug: "cyber-security",
      title: "Cyber Security",
      icon: FaLock,
      summary: "Digital protection for data, networks, and connected systems.",
      bullets: [
        "24/7 SOC monitoring and incident response readiness.",
        "Endpoint protection and threat hunting for active risks.",
        "Compliance guidance for data governance and reporting.",
      ],
      impact:
        "Backed by continuous threat monitoring and rapid containment protocols.",
    },
    {
      id: 21,
      slug: "bio-security",
      title: "Bio Security Systems",
      icon: FaFingerprint,
      summary:
        "Advanced biological threat detection and contamination prevention.",
      bullets: [
        "Real-time detection and monitoring of biological agents.",
        "Integrated emergency protocols and response procedures.",
        "Critical infrastructure and facility protection.",
      ],
      impact:
        "Safeguards occupants and assets through continuous biological monitoring.",
    },
    {
      id: 18,
      slug: "safecall",
      title: "SafeCall (Coming Soon)",
      icon: FaMobile,
      summary:
        "One-touch emergency assistance with live monitoring and rapid escalation.",
      bullets: [
        "Mobile panic activation with real-time location sharing.",
        "Instant control-room verification and response routing.",
        "Designed for staff safety, lone workers, and high-risk travel.",
      ],
      impact:
        "Delivers immediate help and coordinated response when seconds matter.",
      comingSoon: true,
    },
  ];

  // * Staggered entrance animation for the grid.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  // * Shared animation for each service card.
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="services">
      {/* * Hero headline */}
      <section className="services-hero">
        <motion.div
          className="services-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="services-hero__eyebrow">Our Services</p>
          <h1>Integrated security solutions for modern risk environments.</h1>
          <p className="services-hero__subtext">
            Protecting people, assets, infrastructure, and operations with
            intelligent security systems and elite personnel.
          </p>
          <div className="services-hero__chips">
            <span>Trusted Coverage</span>
            <span>24/7 Readiness</span>
            <span>Technology-Led</span>
          </div>
        </motion.div>
      </section>

      {/* * Intro copy */}
      <motion.p
        className="intro"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        We offer comprehensive security solutions tailored to every environment
        and risk profile.
      </motion.p>

      {/* * Physical security services */}
      <section id="physical-security" className="service-category-section">
        <motion.h2
          className="category-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Physical Security Services
        </motion.h2>
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {physicalSecurityServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                id={service.slug}
                className={`service-card ${flippedCardId === service.id ? "is-flipped" : ""}`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                tabIndex={0}
                role="button"
                aria-pressed={flippedCardId === service.id}
                onClick={() => handleCardToggle(service.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardToggle(service.id);
                  }
                }}
              >
                <div
                  className="service-card__inner"
                  style={{ transitionDelay: `${index * 10}ms` }}
                >
                  <div className="service-card__front">
                    {service.comingSoon && (
                      <span className="service-card__ribbon">Coming Soon</span>
                    )}
                    <div className="service-card__icon">
                      <Icon size={26} />
                    </div>
                    <h3>{service.title}</h3>
                    <p className="service-card__summary">{service.summary}</p>
                    <ul>
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <span className="service-card__hint">Click to flip</span>
                  </div>
                  <div className="service-card__back">
                    <p className="service-card__back-title">Why it matters</p>
                    <p className="service-card__back-text">{service.impact}</p>
                    <div className="service-card__back-pill">
                      Always On · Always Ready
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* * Electronic and digital security */}
      <section id="electronic-security" className="service-category-section">
        <motion.h2
          className="category-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Electronic & Digital Security
        </motion.h2>
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {electronicSecurityServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                id={service.slug}
                className={`service-card ${flippedCardId === service.id ? "is-flipped" : ""}`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                tabIndex={0}
                role="button"
                aria-pressed={flippedCardId === service.id}
                onClick={() => handleCardToggle(service.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardToggle(service.id);
                  }
                }}
              >
                <div
                  className="service-card__inner"
                  style={{ transitionDelay: `${index * 10}ms` }}
                >
                  <div className="service-card__front">
                    {service.comingSoon && (
                      <span className="service-card__ribbon">Coming Soon</span>
                    )}
                    <div className="service-card__icon">
                      <Icon size={26} />
                    </div>
                    <h3>{service.title}</h3>
                    <p className="service-card__summary">{service.summary}</p>
                    <ul>
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <span className="service-card__hint">Click to flip</span>
                  </div>
                  <div className="service-card__back">
                    <p className="service-card__back-title">Why it matters</p>
                    <p className="service-card__back-text">{service.impact}</p>
                    <div className="service-card__back-pill">
                      Always On · Always Ready
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* * Monitoring and response */}
      <section id="monitoring-response" className="service-category-section">
        <motion.h2
          className="category-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Monitoring & Response
        </motion.h2>
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {monitoringResponseServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                id={service.slug}
                className={`service-card ${flippedCardId === service.id ? "is-flipped" : ""}`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                tabIndex={0}
                role="button"
                aria-pressed={flippedCardId === service.id}
                onClick={() => handleCardToggle(service.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardToggle(service.id);
                  }
                }}
              >
                <div
                  className="service-card__inner"
                  style={{ transitionDelay: `${index * 10}ms` }}
                >
                  <div className="service-card__front">
                    {service.comingSoon && (
                      <span className="service-card__ribbon">Coming Soon</span>
                    )}
                    <div className="service-card__icon">
                      <Icon size={26} />
                    </div>
                    <h3>{service.title}</h3>
                    <p className="service-card__summary">{service.summary}</p>
                    <ul>
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <span className="service-card__hint">Click to flip</span>
                  </div>
                  <div className="service-card__back">
                    <p className="service-card__back-title">Why it matters</p>
                    <p className="service-card__back-text">{service.impact}</p>
                    <div className="service-card__back-pill">
                      Always On · Always Ready
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* * Specialised security services */}
      <section id="specialised-security" className="service-category-section">
        <motion.h2
          className="category-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Specialised Security Services
        </motion.h2>
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {specialisedSecurityServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                id={service.slug}
                className={`service-card ${flippedCardId === service.id ? "is-flipped" : ""}`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                tabIndex={0}
                role="button"
                aria-pressed={flippedCardId === service.id}
                onClick={() => handleCardToggle(service.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardToggle(service.id);
                  }
                }}
              >
                <div
                  className="service-card__inner"
                  style={{ transitionDelay: `${index * 10}ms` }}
                >
                  <div className="service-card__front">
                    {service.comingSoon && (
                      <span className="service-card__ribbon">Coming Soon</span>
                    )}
                    <div className="service-card__icon">
                      <Icon size={26} />
                    </div>
                    <h3>{service.title}</h3>
                    <p className="service-card__summary">{service.summary}</p>
                    <ul>
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <span className="service-card__hint">Click to flip</span>
                  </div>
                  <div className="service-card__back">
                    <p className="service-card__back-title">Why it matters</p>
                    <p className="service-card__back-text">{service.impact}</p>
                    <div className="service-card__back-pill">
                      Always On · Always Ready
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
