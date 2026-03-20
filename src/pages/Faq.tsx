import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/Faq.css";

type FaqEntry = {
  question: string;
  answer: string;
};

const faqEntries: FaqEntry[] = [
  {
    question: "What services does Gubis85 Security provide?",
    answer:
      "We provide guarding, close protection, event security, control room support, and tailored site-based security solutions.",
  },
  {
    question: "How do I request a quote for security services?",
    answer:
      "You can request a quote through the Contact page or by calling our team directly so we can understand your site and operational needs.",
  },
  {
    question: "Do you operate outside Gauteng?",
    answer:
      "Yes. We operate through a national footprint with regional offices to support clients across multiple provinces.",
  },
  {
    question: "Are your officers trained and compliant?",
    answer:
      "Our officers are deployed according to role requirements, compliance standards, and ongoing internal operational training.",
  },
  {
    question: "Can you support high-profile events and VIP movement?",
    answer:
      "Yes. Our close protection and event teams can support planned movement, perimeter control, and coordinated event safety.",
  },
  {
    question: "How quickly can deployment begin after approval?",
    answer:
      "Deployment timelines depend on scope and location, but we prioritize rapid mobilisation once service requirements are confirmed.",
  },
  {
    question: "Do you provide custom security plans for each client?",
    answer:
      "Yes. We assess each environment and design practical service plans aligned to risk profile, operations, and client expectations.",
  },
  {
    question: "How are incidents reported and escalated?",
    answer:
      "Incidents are documented through structured reporting channels and escalated through the appropriate operational and management lines.",
  },
  {
    question: "How can I apply for jobs at Gubis85 Security?",
    answer:
      "Visit the Careers page to view available opportunities and submit your application through the online process.",
  },
  {
    question: "Who should I contact for urgent service assistance?",
    answer:
      "For urgent support, call our main line at 086 137 7666 so the operations team can assist immediately.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((previousIndex) => (previousIndex === index ? -1 : index));
  };

  return (
    <div className="faq-page">
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="page-hero__eyebrow">FAQ</p>
          <h1 className="faq-heading">
            Frequently Asked <span className="faq-heading__accent">Questions</span>
          </h1>
          <p className="page-hero__subtext">
            Straightforward answers to common questions about our company,
            services, and support process.
          </p>
          <div className="page-hero__chips">
            <span>General Company Info</span>
            <span>Service Questions</span>
            <span>Careers & Support</span>
          </div>
        </motion.div>
      </section>

      <section className="faq-shell">
        <div className="faq-shell__intro">
          <h2>
            Common Questions, <span className="faq-shell__accent">Clear Answers</span>
          </h2>
          <p>
            We have kept these answers concise so visitors can quickly find what
            they need before contacting the team.
          </p>
        </div>

        <div className="faq-layout">
          <aside className="faq-contact-card">
            <h3>Need More Detail?</h3>
            <p>
              If your question is not listed, our team can provide direct
              guidance based on your security requirements.
            </p>
            <div className="faq-contact-card__row">
              <span>Phone</span>
              <strong>086 137 7666</strong>
            </div>
            <div className="faq-contact-card__row">
              <span>Email</span>
              <strong>info@gubis85.co.za</strong>
            </div>
            <div className="faq-contact-card__row">
              <span>Hours</span>
              <strong>Mon - Fri, 08:00 - 16:00</strong>
            </div>
          </aside>

          <div className="faq-list">
            {faqEntries.map((entry, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={entry.question}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-item__question"
                    aria-expanded={isOpen}
                    onClick={() => handleToggle(index)}
                  >
                    <span>{entry.question}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-item__answer-wrap">
                      <p className="faq-item__answer">{entry.answer}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
