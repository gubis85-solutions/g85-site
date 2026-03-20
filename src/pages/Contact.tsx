import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Contact.css";

export default function Contact() {
  const API_URL = (
    import.meta.env.VITE_STRAPI_URL ||
    import.meta.env.VITE_API_URL ||
    "https://g85-cms-backend-production.up.railway.app"
  ).replace(/\/+$/, "");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    serviceInterest: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // * Regional office list for the location section.
  const officeLocations = [
    {
      id: "ho",
      label: "Boitumelo Mahlangu Corporate Office (head office)",
      address: "254 Lochner Road, Raslouw, Centurion, 0109",
      dotClass: "office-dot--ho",
    },
    {
      id: "limpopo",
      label: "Limpopo Office",
      address: "No. 16 5th Avenue, Thabazimbi",
      dotClass: "office-dot--limpopo",
    },
    {
      id: "free-state",
      label: "Free State Office",
      address: "63-67 Kellner Street, Westdene, Bloemfontein, 9301",
      dotClass: "office-dot--free-state",
    },
    {
      id: "north-west",
      label: "North West Office",
      address: "44 Scutte Avenue, Brits, 9250",
      dotClass: "office-dot--north-west",
    },
    {
      id: "northern-cape",
      label: "Northern Cape Office",
      address: "Office No. 28-30, Market Square, Kimberly, 8351",
      dotClass: "office-dot--northern-cape",
    },
    {
      id: "eastern-cape",
      label: "Eastern Cape Office",
      address: "8 Winkley Street, Berea, East London",
      dotClass: "office-dot--eastern-cape",
    },
    {
      id: "western-cape",
      label: "Western Cape Office",
      address: "Unit 6, Pope House, 4 Chenoweth Street, Durbanville",
      dotClass: "office-dot--western-cape",
    },
    {
      id: "mpumalanga",
      label: "Mpumalanga Office",
      address:
        "Nedbank centre, 6 OR Tambo Street, Office No2D, Middelburg, 1040",
      dotClass: "office-dot--mpumalanga",
    },
    {
      id: "kwa-zulu-natal",
      label: "Kwa-Zulu Natal Office",
      address: "Liberty Life Building, 21 Aurora Drive, Umhlanga, 4301",
      dotClass: "office-dot--kwa-zulu-natal",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch(`${API_URL}/api/contact-enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...formData,
            submittedAt: new Date().toISOString().split("T")[0],
          },
        }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      setSubmitStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", businessName: "", serviceInterest: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* * Page hero */}
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

      {/* * Two-column layout: info + form */}
      <div className="contact-container">
        {/* * Company contact details */}
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
              Incase of an emergency, please contact us on 086 137 7666 for immediate 24hr assistance.
            </p>
          </div>
        </div>

        {/* * Contact form */}
        <div className="contact-form-wrapper">
          <h2 className="contact-heading">
            Send Us A <span className="contact-heading__accent">Message</span>
          </h2>

          {submitStatus === "success" && (
            <p className="form-feedback form-feedback--success">
              ✓ Message sent! We will get back to you shortly.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="form-feedback form-feedback--error">
              Something went wrong. Please try again or email us directly.
            </p>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First name"
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+27 ..."
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="businessName">Business Name</label>
              <input
                id="businessName"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your company (optional)"
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="serviceInterest">Service Interest</label>
              <select
                id="serviceInterest"
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
              >
                <option value="">Select a service...</option>
                <option value="Physical Security">Physical Security</option>
                <option value="Close Protection">Close Protection</option>
                <option value="Electronic & Digital Security">Electronic &amp; Digital Security</option>
                <option value="Monitoring & Response">Monitoring &amp; Response</option>
                <option value="Specialised Security">Specialised Security</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              className="contact-form__submit"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* * Embedded map */}
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
