import { motion } from "framer-motion";
import "../styles/Contact.css";

export default function Contact() {
  const officeLocations = [
    {
      id: "ho",
      label: "Boitumelo Mahlangu Corporate Office (head office)",
      address: "254 Lochner Road, Raslouw, Centurion, 0109",
    },
    {
      id: "limpopo",
      label: "Limpopo Office",
      address: "No. 16 5th Avenue, Thabazimbi",
    },
    {
      id: "free-state",
      label: "Free State Office",
      address: "63-67 Kellner Street, Westdene, Bloemfontein, 9301",
    },
    {
      id: "north-west",
      label: "North West Office",
      address: "44 Scutte Avenue, Brits, 9250",
    },
    {
      id: "northern-cape",
      label: "Northern Cape Office",
      address: "Office No. 28-30, Market Square, Kimberly, 8351",
    },
    {
      id: "eastern-cape",
      label: "Eastern Cape Office",
      address: "8 Winkley Street, Berea, East London",
    },
    {
      id: "western-cape",
      label: "Western Cape Office",
      address: "Unit 6, Pope House, 4 Chenoweth Street, Durbanville",
    },
    {
      id: "mpumalanga",
      label: "Mpumalanga Office",
      address: "Nedbank centre, 6 OR Tambo Street, Office No2D, Middelburg, 1040",
    },
    {
      id: "kwa-zulu-natal",
      label: "Kwa-Zulu Natal Office",
      address: "Liberty Life Building, 21 Aurora Drive, Umhlanga, 4301",
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
