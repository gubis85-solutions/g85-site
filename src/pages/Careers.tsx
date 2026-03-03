import '../styles/Careers.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Careers() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:1337/api/careers?filters[jobStatus][$eq]=Open&sort=createdAt:desc")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="careers">

      {/* Hero intro */}
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="page-hero__eyebrow">Careers</p>
          <h1>Careers at Gubis85 Security Service</h1>
          <p className="page-hero__subtext">
            Join a mission-driven team delivering trusted protection and innovative security solutions.
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

          {!loading && jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <p className="job-location">{job.location}</p>
              </div>

              <p>{job.description}</p>

              <button className="apply-btn">
                Apply Now
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