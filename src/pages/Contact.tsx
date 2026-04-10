import { motion } from "framer-motion";
import "../styles/Contact.css";

export default function Contact() {
  const officeLocations = [
    {
      id: "ho",
      label: "Boitumelo Mahlangu Corporate Office (head office)",
      address: "254 Lochner Road, Raslouw, Centurion, 0109",
    },
  ];

  return (
    <div className="contact">
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="page-hero__eyebrow">Contact</p>
          <h1>Contact Us</h1>
          <p className="page-hero__subtext">
            Reach our team for consultations, incident response planning, and
            tailored security solutions.
          </p>
          <div className="page-hero__chips">
            <span>24/7 Availability</span>
            <span>Local Presence</span>
            <span>Expert Team</span>
          </div>
        </motion.div>
      </section>

      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-heading">
            Get In <span className="contact-heading__accent">Touch</span>
          </h2>
          <div className="info-item">
            <h3>Contact</h3>
            <p>086 137 7666</p>
            <p>info@Gubis85.co.za</p>
          </div>
          <div className="info-item">
            <h3>Address</h3>
            <p>
              Boitumelo Mahlangu Corporate Office (head office)
              <br />
              254 Lochner Road
              <br />
              Raslouw, Centurion
              <br />
              0109, South Africa
            </p>
          </div>
          <div className="info-item">
            <h3 className="contact-subheading">
              Practical Location Information
              <br />
              <span className="contact-subheading__accent">
                (Head Office & regional)
              </span>
            </h3>
            <ul className="office-list">
              {officeLocations.map((office) => (
                <li key={office.id} className="office-item">
                  <div className="office-details">
                    <h4>{office.label}</h4>
                    <p>{office.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="info-item">
            <h3>Hours</h3>
            <p>
              Monday - Friday: 8AM - 4PM
              <br />
              Incase of an emergency, please contact us on 086 137 7666 for
              immediate 24hr assistance.
            </p>
          </div>
        </div>
      </div>

      <section className="contact-map">
        <div className="contact-map__header">
          <h2 className="contact-heading">
            Our <span className="contact-heading__accent">Location</span>
          </h2>
          <p>Visit us at Boitumelo Mahlangu Corporate Office (head office).</p>
        </div>
        <div className="contact-map__frame">
          <iframe
            title="Boitumelo Mahlangu Corporate House location"
            src="https://www.google.com/maps?cid=0x1e95654e08b9d525%3A0x1d5fa18aa949aef1&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}
