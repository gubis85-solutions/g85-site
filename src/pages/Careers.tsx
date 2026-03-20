import "../styles/Careers.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CareerJob = {
  id: number;
  title: string;
  location: string;
  description: string;
  referenceCode: string;
  imageUrl: string | null;
};

export default function Careers() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://g85-cms-backend-production.up.railway.app";

  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${API_URL}/api/careers?filters[postStatus][$eq]=Open&sort=createdAt:desc&populate=image`
    )
      .then((res) => res.json())
      .then((data) => {
        const formattedJobs = (data.data || []).map((item: any) => ({
        id: item.id,
        title: item.title ?? "Security Position",
        location: item.location ?? "South Africa",
        description: item.description ?? "",
        referenceCode: item.referenceCode ?? "N/A",
        imageUrl: item.image?.url
          ? `${API_URL}${item.image.url}`
          : null,
        }));

        setJobs(formattedJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="careers">
      {/* Hero */}
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="page-hero__eyebrow">Careers</p>
          <h1>Careers at Gubis85 Security Service</h1>
          <p className="page-hero__subtext">
            Join a mission-driven team delivering trusted protection and
            innovative security solutions.
          </p>
        </motion.div>
      </section>

      {/* Open Positions */}
      <section className="open-positions">
        <h2 className="careers-heading">
          Open <span className="careers-heading__accent">Positions</span>
        </h2>

        <div className="jobs-list">
          {loading && <p>Loading positions...</p>}

          {!loading && jobs.length === 0 && (
            <p>No open positions available at the moment.</p>
          )}

          {!loading &&
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                {job.imageUrl && (
                  <div className="job-card__image-wrap">
                    <img
                      src={job.imageUrl}
                      alt={job.title}
                      className="job-card__image"
                    />
                  </div>
                )}
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <p className="job-location">{job.location}</p>
                </div>

                <div
                  className="job-description"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />

                {/* Reference Code Visible */}
                <p className="job-reference">
                  Reference: <strong>{job.referenceCode}</strong>
                </p>

                <button
                  className="career-apply-button"
                  type="button"
                  onClick={() =>
                    navigate(
                      `/careers/apply?position=${encodeURIComponent(
                        job.title
                      )}&ref=${encodeURIComponent(job.referenceCode)}`
                    )
                  }
                >
                  Apply for Position
                </button>
              </div>
            ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="join-us">
        <h2>Interested in Joining Us?</h2>
        <p>Send your resume to careers@gubis85.co.za</p>
      </section>
    </div>
  );
}