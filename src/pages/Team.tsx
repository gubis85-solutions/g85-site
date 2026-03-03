import '../styles/Team.css';
import { motion } from 'framer-motion';
import execImg from '../assets/management-images/Executive-Managent.jpg';
import gmImg from '../assets/management-images/general_manager.jpg';
import irImg from '../assets/management-images/industrial_relations.jpg';
import hrImg from '../assets/management-images/hr_payroll.jpg';
import opsImg from '../assets/management-images/Operations.jpg';
import complianceImg from '../assets/management-images/compliance.png';
import supplyChainImg from '../assets/management-images/supply_chain.jpg';
import cfoImg from '../assets/management-images/CFO.jpg';
import logisticsImg from '../assets/management-images/Logistics.jpg';

const executiveLeaders = [
  {
    role: 'Board of Directors',
    name: 'Mr Calvin Mahlangu & Mrs Boitumelo Mahlangu',
    note: 'Founder & Executive Chairman | Executive Director ',
    note1: 'Strategic vision, corporate governance, and enterprise leadership.',
    bio: 'Co-founders with a combined 30+ years of leadership in security and community engagement, overseeing strategy and growth.',
    image: execImg,
  },
  {
    role: 'General Manager',
    name: 'Mr Zakhele Khumalo',
    note: 'Executive leadership, enterprise strategy, and performance.',
    image: gmImg,
    bio: 'Leads day-to-day operations, performance management, and service delivery across all regions.',
  },
];

const departmentHeads = [
  {
    role: 'Chief Financial Officer',
    name: 'Mr William Moshupye',
    note: 'Financial stewardship, budgeting, governance, and reporting.',
    image: cfoImg,
    bio: 'Leads financial strategy, budgeting, controls, and statutory reporting to support sustainable growth and sound governance.',
  },
  {
    role: 'Logistics Director',
    name: 'Ms Lorraine Ngedle',
    note: 'Logistics planning, fleet coordination, and service continuity.',
    image: logisticsImg,
    bio: 'Oversees logistics planning, resource deployment, and delivery coordination to keep operations responsive and reliable.',
  },
  {
    role: 'Industrial Relations',
    name: 'Ms. Precious Skosana',
    note: 'Labour relations, workforce engagement, and compliance.',
    image: irImg,
    bio: 'Expert in employee relations and engagement, ensuring fair labour practices and constructive workplace dialogue.',
  },
  {
    role: 'HR & Payroll',
    name: 'Ms. Maud Wiedeman',
    note: 'Talent, onboarding, payroll accuracy, and staff care.',
    image: hrImg,
    bio: 'Responsible for talent acquisition, payroll integrity, and staff wellbeing programmes.',
  },
  {
    role: 'Operations',
    name: 'Mr City Ndala',
    note: 'Operational readiness, site delivery, and service quality.',
    image: opsImg,
    bio: 'Oversees field operations and ensures teams deliver consistent, high-quality services to clients.',
  },
  {
    role: 'Compliance',
    name: 'Mr Kgwadi Tende',
    note: 'Regulatory alignment, audit readiness, and standards.',
    image: complianceImg,
    bio: 'Drives compliance, risk management, and audit preparedness across the organisation.',
  },
  {
    role: 'Supply Chain',
    name: 'Mr Tiyani Khoza',
    note: 'Procurement strategy, vendor management, and logistics.',
    image: supplyChainImg,
    bio: 'Manages procurement, vendor relationships, and logistics to support uninterrupted operations.',
  },
];

// Operations support removed per request

export default function Team() {
  return (
    <div className="team-page">
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="page-hero__eyebrow">Team</p>
          <h1 className="team-heading">
            Team <span className="team-heading__accent">Gubis85</span>
          </h1>
          <p className="page-hero__subtext">
            Meet the department heads who guide our operations, compliance, and service delivery.
          </p>
          <div className="page-hero__chips">
            <span>Expert Leadership</span>
            <span>Operational Excellence</span>
            <span>Strategic Vision</span>
          </div>
        </motion.div>
      </section>

      <section className="team-section">
        <div className="team-section__header">
          <h2 className="team-section__heading">
            Executive <span className="team-section__accent">Leadership</span>
          </h2>
          <p>Leadership responsible for strategic direction and enterprise governance.</p>
        </div>
        <div className="team-grid team-grid--featured">
          {executiveLeaders.map((leader) => (
            <article key={leader.name} className="team-card">
              <div className="team-card__photo" aria-hidden="true">
                {leader.image ? (
                  <img src={leader.image} alt={leader.name} className="team-card__photo-img" />
                ) : (
                  <span>Photo</span>
                )}
              </div>
              <div className="team-card__body">
                <p className="team-card__role">{leader.role}</p>
                <h3>{leader.name}</h3>
                <p className="team-card__note">{leader.note}</p>
                {leader.note1 && <p className="team-card__note">{leader.note1}</p>}
                {leader.bio && <p className="team-card__bio">{leader.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-section">
        <div className="team-section__header">
          <h2 className="team-section__heading">
            Department <span className="team-section__accent">Heads</span>
          </h2>
          <p>Senior leaders across finance, people, operations, compliance, and supply chain.</p>
        </div>
        <div className="team-grid">
          {departmentHeads.map((leader) => (
            <article key={leader.name} className="team-card">
              <div className="team-card__photo" aria-hidden="true">
                {leader.image ? (
                  <img src={leader.image} alt={leader.name} className="team-card__photo-img" />
                ) : (
                  <span>Photo</span>
                )}
              </div>
              <div className="team-card__body">
                <p className="team-card__role">{leader.role}</p>
                <h3>{leader.name}</h3>
                <p className="team-card__note">{leader.note}</p>
                {leader.bio && <p className="team-card__bio">{leader.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
