import "../styles/Team.css";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getStrapiMediaUrl } from "../lib/strapi";
import fallbackTeamPhoto from "../assets/gubis85.png";

import cpoActionImg from "../assets/Team-Page/CPO-officers-In-action.jpg";
import briefingRoomImg from "../assets/Team-Page/teams-office-02-briefing-room.jpg";
import monitoringDeskImg from "../assets/Team-Page/teams-office-03-monitoring-desk.jpg";
import trainingRoomImg from "../assets/Team-Page/teams-office-04-training-room.jpg";
import cultureMomentImg from "../assets/Team-Page/teams-office-05-culture-moment.jpg";
import receptionImg from "../assets/Team-Page/teams-office-06-reception.jpg";

type TeamPane = {
  id: number;
  key: "executive_leadership" | "department_heads";
  titlePrefix: string;
  titleAccent: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  note: string;
  secondaryNote?: string;
  bio?: string;
  photoUrl?: string | null;
  pane?: {
    id: number;
    key: "executive_leadership" | "department_heads";
  } | null;
};

type OfficeGalleryFrame = {
  id: string;
  title: string;
  brief: string;
  image: string;
  alt: string;
  layoutClass: string;
};

const officeGalleryFrames: OfficeGalleryFrame[] = [
  {
    id: "cpo-officers",
    title: "Close Protection Officers In Action",
    brief:
      "Our Close Protection Officers coordinate secure movement, stay alert to perimeter activity, and maintain rapid-response readiness for every assignment.",
    image: cpoActionImg,
    alt: "Close Protection Officers working in active deployment",
    layoutClass: "office-gallery__item--feature",
  },
  {
    id: "briefing-room",
    title: "Morning Briefing Session",
    brief:
      "Daily planning sessions align supervisors and field teams on client priorities, site updates, and resource deployment.",
    image: briefingRoomImg,
    alt: "Security team members in a planning briefing",
    layoutClass: "office-gallery__item--tall",
  },
  {
    id: "monitoring-desk",
    title: "Monitoring And Coordination Desk",
    brief:
      "Our coordination desk supports active communication, incident logging, and continuous monitoring for faster response times.",
    image: monitoringDeskImg,
    alt: "Operations desk with monitoring equipment and communications",
    layoutClass: "office-gallery__item--square",
  },
  {
    id: "training-room",
    title: "Training In Progress",
    brief:
      "Continuous skills development sessions keep our teams aligned with operational standards, safety protocols, and client requirements.",
    image: trainingRoomImg,
    alt: "Security personnel participating in training",
    layoutClass: "office-gallery__item--wide",
  },
  {
    id: "culture-moment",
    title: "Team Culture Moment",
    brief:
      "Collaboration and peer support are central to how we build trust, accountability, and long-term team performance.",
    image: cultureMomentImg,
    alt: "Team members collaborating in the office",
    layoutClass: "office-gallery__item--tall",
  },
  {
    id: "reception",
    title: "Reception And Client Welcome",
    brief:
      "Our reception environment reflects professionalism from first contact, with clear communication and a welcoming client experience.",
    image: receptionImg,
    alt: "Reception area ready to welcome visitors",
    layoutClass: "office-gallery__item--wide",
  },
];

export default function Team() {
  const API_URL = (
    import.meta.env.VITE_STRAPI_URL ||
    import.meta.env.VITE_API_URL ||
    "https://g85-cms-backend-production.up.railway.app"
  ).replace(/\/+$/, "");

  const [panes, setPanes] = useState<TeamPane[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [brokenPhotos, setBrokenPhotos] = useState<number[]>([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [panesRes, membersRes] = await Promise.all([
          fetch(
            `${API_URL}/api/team-panes?filters[isActive][$eq]=true&sort=displayOrder:asc`
          ),
          fetch(`${API_URL}/api/team-members?populate[0]=pane&populate[1]=photo&sort=displayOrder:asc`),
        ]);

        const panesJson = await panesRes.json();
        const membersJson = await membersRes.json();

        const formattedPanes: TeamPane[] = (panesJson.data || []).map(
          (item: any) => ({
            id: item.id,
            key: item.key,
            titlePrefix: item.titlePrefix,
            titleAccent: item.titleAccent,
            description: item.description,
            displayOrder: item.displayOrder,
            isActive: item.isActive,
          })
        );

        const formattedMembers: TeamMember[] = (membersJson.data || []).map(
          (item: any) => {
            const photoData = Array.isArray(item.photo)
              ? item.photo[0]
              : item.photo?.data
                ? Array.isArray(item.photo.data)
                  ? item.photo.data[0]
                  : item.photo.data
                : item.photo;
            const photoAttrs = photoData?.attributes ?? photoData;
            const rawPhotoUrl = photoAttrs?.url;
            const strapiPhoto = rawPhotoUrl
              ? getStrapiMediaUrl(rawPhotoUrl)
              : null;

            return {
              id: item.id,
              name: item.name,
              role: item.role,
              note: item.note,
              secondaryNote: item.secondaryNote,
              bio: item.bio,
              photoUrl: strapiPhoto,
              pane: item.pane
                ? {
                    id: item.pane.id,
                    key: item.pane.key,
                  }
                : null,
            };
          }
        );

        setPanes(formattedPanes);
        setMembers(formattedMembers);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [API_URL]);

  const executivePane = useMemo(
    () => panes.find((pane) => pane.key === "executive_leadership"),
    [panes]
  );

  const departmentPane = useMemo(
    () => panes.find((pane) => pane.key === "department_heads"),
    [panes]
  );

  const executiveLeaders = useMemo(
    () =>
      members.filter(
        (member) => member.pane?.key === "executive_leadership"
      ),
    [members]
  );

  const departmentHeads = useMemo(
    () =>
      members.filter((member) => member.pane?.key === "department_heads"),
    [members]
  );

  const resolveMemberPhoto = (member: TeamMember) =>
    member.photoUrl && !brokenPhotos.includes(member.id)
      ? member.photoUrl
      : fallbackTeamPhoto;

  return (
    <div className="team-page">
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="page-hero__eyebrow">Team</p>
          <h1 className="team-heading">
            Team <span className="team-heading__accent">Gubis85</span>
          </h1>
          <p className="page-hero__subtext">
            Meet the department heads who guide our operations, compliance, and
            service delivery.
          </p>
          <div className="page-hero__chips">
            <span>Expert Leadership</span>
            <span>Operational Excellence</span>
            <span>Strategic Vision</span>
          </div>
        </motion.div>
      </section>

      <section className="team-section team-section--office-story">
        <div className="team-section__header">
          <h2 className="team-section__heading">
            Inside Our <span className="team-section__accent">Office</span>
          </h2>
          <p>
            A visual look into our operating environment, from close protection
            readiness to team coordination, training, and client-facing spaces.
          </p>
        </div>

        <div className="office-gallery">
          {officeGalleryFrames.map((frame) => (
            <article
              key={frame.id}
              className={`office-gallery__item ${frame.layoutClass}`}
            >
              <div className="office-gallery__media">
                <img
                  src={frame.image}
                  alt={frame.alt}
                  className="office-gallery__image"
                />
              </div>
              <h3>{frame.title}</h3>
              <p>{frame.brief}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="team-section">
        <div className="team-section__header">
          <h2 className="team-section__heading">
            {executivePane?.titlePrefix || "Executive"}{" "}
            <span className="team-section__accent">
              {executivePane?.titleAccent || "Leadership"}
            </span>
          </h2>
          <p>
            {executivePane?.description ||
              "Leadership responsible for strategic direction and enterprise governance."}
          </p>
        </div>

        {loading ? (
          <p>Loading team members...</p>
        ) : (
          <div className="team-grid team-grid--featured">
            {executiveLeaders.map((leader) => {
              return (
                <article key={leader.id} className="team-card">
                  <div className="team-card__photo" aria-hidden="true">
                    <img
                      src={resolveMemberPhoto(leader)}
                      alt={leader.name}
                      className="team-card__photo-img"
                      onError={() =>
                        setBrokenPhotos((current) =>
                          current.includes(leader.id)
                            ? current
                            : [...current, leader.id],
                        )
                      }
                    />
                  </div>

                  <div className="team-card__body">
                    <p className="team-card__role">{leader.role}</p>
                    <h3>{leader.name}</h3>
                    <p className="team-card__note">{leader.note}</p>
                    {leader.secondaryNote && (
                      <p className="team-card__note">{leader.secondaryNote}</p>
                    )}
                    {leader.bio && <p className="team-card__bio">{leader.bio}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="team-section">
        <div className="team-section__header">
          <h2 className="team-section__heading">
            {departmentPane?.titlePrefix || "Department"}{" "}
            <span className="team-section__accent">
              {departmentPane?.titleAccent || "Heads"}
            </span>
          </h2>
          <p>
            {departmentPane?.description ||
              "Senior leaders across finance, people, operations, compliance, and supply chain."}
          </p>
        </div>

        {loading ? (
          <p>Loading team members...</p>
        ) : (
          <div className="team-grid">
            {departmentHeads.map((leader) => {
              return (
                <article key={leader.id} className="team-card">
                  <div className="team-card__photo" aria-hidden="true">
                    <img
                      src={resolveMemberPhoto(leader)}
                      alt={leader.name}
                      className="team-card__photo-img"
                      onError={() =>
                        setBrokenPhotos((current) =>
                          current.includes(leader.id)
                            ? current
                            : [...current, leader.id],
                        )
                      }
                    />
                  </div>

                  <div className="team-card__body">
                    <p className="team-card__role">{leader.role}</p>
                    <h3>{leader.name}</h3>
                    <p className="team-card__note">{leader.note}</p>
                    {leader.secondaryNote && (
                      <p className="team-card__note">{leader.secondaryNote}</p>
                    )}
                    {leader.bio && <p className="team-card__bio">{leader.bio}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
