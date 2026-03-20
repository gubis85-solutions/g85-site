import { useSearchParams } from "react-router-dom";
import "../styles/CareerApplication.css";

export default function CareerApplication() {
  const [searchParams] = useSearchParams();

  const position = searchParams.get("position");
  const reference = searchParams.get("ref");

  const email = "careers@gubis85.co.za";

  const emailSubject = `Job Application – ${reference} – Your Name`;

  const copyReference = () => {
    if (reference) {
      navigator.clipboard.writeText(reference);
      alert("Reference code copied");
    }
  };

  return (
    <div className="application-page">
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__eyebrow">Careers</p>
          <h1>Apply for Position</h1>
          <p className="page-hero__subtext">
            Complete your application with the required documentation and
            correct reference code so our recruitment team can review it
            quickly.
          </p>
          {(position || reference) && (
            <div className="page-hero__chips">
              {position && <span>{position}</span>}
              {reference && <span>Ref: {reference}</span>}
            </div>
          )}
        </div>
      </section>

      <div className="application-card">
        <h1>Application Instructions</h1>

        {position && <h2>{position}</h2>}

        {reference && (
          <p className="reference">
            Reference Code: <strong>{reference}</strong>
          </p>
        )}

        {reference && (
          <button className="copy-button" onClick={copyReference}>
            Copy Reference Code
          </button>
        )}

        <section className="instructions">
          <h3>How to Apply</h3>

          <p>
            To apply for this position, please email your application to our
            recruitment department with the required documents attached.
          </p>

          <h3>Required Documents</h3>

          <ul>
            <li>Updated Curriculum Vitae (CV)</li>
            <li>Certified copy of South African ID</li>
            <li>PSIRA Certificate</li>
            <li>Relevant training certificates</li>
            <li>Driver's licence (if applicable)</li>
            <li>Short cover letter (optional)</li>
          </ul>

          <h3>Email Address</h3>

          <p className="email-address">{email}</p>

          <h3>Email Subject Format</h3>

          <p className="email-subject">{emailSubject}</p>

          <p className="note">
            Please ensure the reference code is included in your subject line
            so our recruitment team can correctly identify the job post.
          </p>

          <a
            href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`}
            className="apply-email-button"
          >
            Apply via Email
          </a>
        </section>
      </div>
    </div>
  );
}