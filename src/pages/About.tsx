import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/About.css";
import marketStatsImg from "../assets/Market presence/Market-share-Stats.png";
import absaLogo from "../assets/associate card pics/ABSA.png";
import affinityHealthLogo from "../assets/associate card pics/AFFINITY-HEALTH.png";
import bidvestLogo from "../assets/associate card pics/bidvest.png";
import boschUniformLogo from "../assets/associate card pics/BOSCH-UNIFORM-SUPPLIES.png";
import esPrintingLogo from "../assets/associate card pics/ES-PRinting.png";
import fnbLogo from "../assets/associate card pics/FNB.png";
import haloTechLogo from "../assets/associate card pics/HALO-TECHNOLOGIES.png";
import instacomLogo from "../assets/associate card pics/INSTACOM.png";
import itechLogo from "../assets/associate card pics/ITECH.png";
import outsuranceLogo from "../assets/associate card pics/OUTSURANCE.png";
import toyotaLogo from "../assets/associate card pics/Picture-1-1.png";
import psiraLogo from "../assets/associate card pics/PSIRA.png";
import psspfLogo from "../assets/associate card pics/psspf-300x164.png";
import sapsLogo from "../assets/associate card pics/saps.png";
import satlecLogo from "../assets/associate card pics/satlec.png";
import talismanLogo from "../assets/associate card pics/talisman.png";
import zaMapSvg from "../assets/Map/za.svg?raw";
import ivolineLogo from "../assets/logos transparent/ivoline.png";
import liyanaLogo from "../assets/logos transparent/liyana.png";
import mbathaLogo from "../assets/logos transparent/mbatha.png";
import sothiLogo from "../assets/logos transparent/sothi.png";

const provinceIdByLocationId: Record<string, string> = {
  gauteng: "ZAGP",
  limpopo: "ZALP",
  "free-state": "ZAFS",
  "north-west": "ZANW",
  "northern-cape": "ZANC",
  "western-cape": "ZAWC",
  "eastern-cape": "ZAEC",
  mpumalanga: "ZAMP",
  "kwa-zulu-natal": "ZAKZN",
};

const locationIdByProvinceId: Record<string, string> = {
  ZAGP: "gauteng",
  ZALP: "limpopo",
  ZAFS: "free-state",
  ZANW: "north-west",
  ZANC: "northern-cape",
  ZAWC: "western-cape",
  ZAEC: "eastern-cape",
  ZAMP: "mpumalanga",
  ZAKZN: "kwa-zulu-natal",
};

export default function About() {
  // * Tracks which map pin and office details are active.
  const [activeLocationId, setActiveLocationId] = useState("gauteng");

  const mapRef = useRef<HTMLDivElement | null>(null);

  const mapMarkup = useMemo(() => {
    let svgMarkup = zaMapSvg;
    svgMarkup = svgMarkup.replace(/<g id="points">[\s\S]*?<\/g>/g, "");
    svgMarkup = svgMarkup.replace("<svg ", '<svg class="about-map__svg" ');

    Object.keys(locationIdByProvinceId).forEach((provinceId) => {
      svgMarkup = svgMarkup.replace(
        new RegExp(`id="${provinceId}" name="([^"]+)"`),
        `id="${provinceId}" name="$1" data-province="true" tabindex="0" role="button" aria-label="$1"`,
      );
    });

    return svgMarkup;
  }, []);

  // * Office list used in the details pane.
  const officeList = [
    {
      id: "gauteng",
      name: "Boitumelo Mahlangu Corporate Office (head office)",
      address: "254 Lochner Road, Raslouw, Centurion, 0109",
      color: "#F48020",
    },
    {
      id: "limpopo",
      name: "Limpopo Office",
      address: "No. 16 5th Avenue, Thabazimbi",
      color: "#8B5E34",
      titleClassName: "about-map__title--brown",
    },
    {
      id: "free-state",
      name: "Free State Operations Office",
      address: "63-67 Kellner Street, Westdene, Bloemfontein, 9301",
      color: "#1B234E",
      titleClassName: "about-map__title--blue",
    },
    {
      id: "north-west",
      name: "North West office",
      address: "44 Scutte Avenue, Brits, 9250",
      color: "#7bb6ff",
      titleClassName: "about-map__title--light-blue",
    },
    {
      id: "northern-cape",
      name: "Northern Cape office",
      address: "Office No. 28-30, Market Square, Kimberly, 8351",
      color: "#f4d03f",
      titleClassName: "about-map__title--yellow",
    },
    {
      id: "eastern-cape",
      name: "Eastern Cape office",
      address: "8 Winkley Street, Berea, East London",
      color: "#d62728",
      titleClassName: "about-map__title--red",
    },
    {
      id: "western-cape",
      name: "Western Cape office",
      address: "Unit 6, Pope House, 4 Chenoweth Street, Durbanville",
      color: "#9467bd",
      titleClassName: "about-map__title--purple",
    },
    {
      id: "mpumalanga",
      name: "Mpumalanga office",
      address:
        "Nedbank centre, 6 OR Tambo Street, Office No2D, Middelburg, 1040",
      color: "#1B5E20",
      titleClassName: "about-map__title--green",
    },
    {
      id: "kwa-zulu-natal",
      name: "Kwa-Zulu Natal office",
      address: "Liberty Life Building, 21 Aurora Drive, Umhlanga, 4301",
      color: "#7ED957",
      titleClassName: "about-map__title--light-green",
    },
  ];

  // * Partner brands shown in the collage.
  const partners = [
    { name: "PSIRA", logo: psiraLogo },
    { name: "OUTsurance", logo: outsuranceLogo },
    { name: "Instacom", logo: instacomLogo },
    { name: "Halo Technologies", logo: haloTechLogo },
    { name: "FNB", logo: fnbLogo },
    { name: "Bosch Uniform Supplies", logo: boschUniformLogo },
    { name: "Affinity Health", logo: affinityHealthLogo },
    { name: "ABSA", logo: absaLogo },
    { name: "Talisman", logo: talismanLogo },
    { name: "Satlec", logo: satlecLogo },
    { name: "SAPS", logo: sapsLogo },
    { name: "PSSPF", logo: psspfLogo },
    { name: "Toyota", logo: toyotaLogo },
    { name: "iTech", logo: itechLogo },
    { name: "ES Printing & Projects", logo: esPrintingLogo },
    { name: "Bidvest Steiner", logo: bidvestLogo },
  ];

  // * Sister companies shown in the network strip.
  const sisterCompanies = [
    { name: "Ivoline", logo: ivolineLogo },
    { name: "Liyana", logo: liyanaLogo },
    { name: "Mbatha", logo: mbathaLogo },
    { name: "Sothi", logo: sothiLogo },
  ];

  // * Staggered entrance animation for sections.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  // * Shared animation for individual cards.
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const mapRoot = mapRef.current;
    if (!mapRoot) return;

    const labelGroup = mapRoot.querySelector("g#label_points");
    if (!labelGroup) return;

    if (labelGroup.querySelector('text[data-province-label="true"]')) return;

    const svgRoot = mapRoot.querySelector("svg.about-map__svg");
    if (!svgRoot) return;

    const labelOffsets: Record<string, { dx: number; dy: number }> = {
      Mpumalanga: { dx: 52, dy: -12 },
      Gauteng: { dx: -12, dy: -10 },
    };

    labelGroup.querySelectorAll("circle").forEach((circle) => {
      const provinceName = circle.getAttribute("class");
      const cx = circle.getAttribute("cx");
      const cy = circle.getAttribute("cy");
      if (!provinceName || !cx || !cy) return;

      const offset = labelOffsets[provinceName];
      const x = Number(cx) + (offset?.dx ?? 0);
      const y = Number(cy) + (offset?.dy ?? 0);

      const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      label.setAttribute("x", String(x));
      label.setAttribute("y", String(y));
      label.setAttribute("data-province-label", "true");
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("dominant-baseline", "middle");
      label.textContent = provinceName;
      svgRoot.appendChild(label);
    });
  }, [activeLocationId]);

  useEffect(() => {
    const mapRoot = mapRef.current;
    if (!mapRoot) return;

    const activeProvinceId = provinceIdByLocationId[activeLocationId];
    mapRoot.querySelectorAll('path[data-province="true"]').forEach((path) => {
      path.classList.toggle("is-active", path.id === activeProvinceId);
    });
  }, [activeLocationId]);

  const handleMapSelect = (provinceId: string) => {
    const locationId = locationIdByProvinceId[provinceId];
    if (locationId) {
      setActiveLocationId(locationId);
    }
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target || !target.id) return;
    handleMapSelect(target.id);
  };

  const handleMapKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target as HTMLElement | null;
    if (!target || !target.id) return;
    event.preventDefault();
    handleMapSelect(target.id);
  };

  return (
    <div className="about">
      {/* * Hero intro */}
      <section className="about-hero">
        <motion.div
          className="about-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="about-hero__eyebrow">About Us</p>
          <h1>Specialised superior security and protection solutions.</h1>
          <p className="about-hero__subtext">
            Gubis85 Solutions (Pty) Ltd delivers trusted physical and digital security in a dynamic safety climate across South Africa and beyond.
          </p>
          <div className="about-hero__chips">
            <span>BBBEE Accredited</span>
            <span>100% Black Owned</span>
            <span>Established 2013</span>
          </div>
        </motion.div>
      </section>

      {/* * Main content blocks */}
      <motion.section
        className="about-body"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* * Video player section */}
        <motion.div
          className="about-card about-video-section"
          variants={itemVariants}
        >
          <p className="about-card__eyebrow about-card__eyebrow--accent">
            More About Gubis85
          </p>

          <div className="video-player-container">
            <iframe
              src="https://www.youtube.com/embed/Ha056AWrcdw?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=Ha056AWrcdw"
              className="video-player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Gubis85 Solutions Overview"
              style={{ border: "none" }}
            />
          </div>
        </motion.div>

        {/* * Vision and mission */}
        <motion.div className="about-grid" variants={itemVariants}>
          <div className="about-panel">
            <p className="about-panel__title">Vision</p>
            <p>
              To become a leading security service company in Southern Africa
              and beyond by offering a global physical and digital security
              systems network.
            </p>
          </div>
          <div className="about-panel">
            <p className="about-panel__title">Mission</p>
            <p>
              To provide our clientele with superior service that meets dynamic
              needs through specialised solutions and cost-effective approaches.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="about-card about-card--market"
          variants={itemVariants}
        >
          <div className="about-market__frame">
            <img
              className="about-market__image"
              src={marketStatsImg}
              alt="Market share statistics"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* * Strategic focus list */}
        <motion.div className="about-card" variants={itemVariants}>
          <h2>
            Our Strategic <span className="about-h2__accent">Focus Areas</span>
          </h2>
          <ul className="about-list">
            <li>Offering superior quality services at competitive prices.</li>
            <li>Improving economic benefits of targeted beneficiaries.</li>
            <li>
              Effective cooperation with emerging and established businesses
              sharing our vision.
            </li>
            <li>Financial capacitation across all structures.</li>
            <li>Holistic business development and growth sustenance.</li>
            <li>
              Building capacity through research, consultation, and partnerships
              across sectors.
            </li>
          </ul>
        </motion.div>

        {/* * Interactive office map and details */}
        <motion.div className="about-card about-map" variants={itemVariants}>
          <h2>
            Where to find us <br />{" "}
            <span className="about-h2__accent">Office Locations</span>
          </h2>
          <div className="about-map__layout">
            <div
              className="about-map__canvas"
              role="img"
              aria-label="Map of South Africa with office locations"
              ref={mapRef}
              onClick={handleMapClick}
              onKeyDown={handleMapKeyDown}
              dangerouslySetInnerHTML={{ __html: mapMarkup }}
            />
            <div className="about-map__details">
              <div className="about-map__list">
                {officeList.map((location) => {
                  const isActive = activeLocationId === location.id;
                  return (
                    <div
                      key={location.id}
                      className={`about-map__item${isActive ? " is-active" : ""}`}
                    >
                      <button
                        type="button"
                        className={`about-map__title${location.titleClassName ? ` ${location.titleClassName}` : ""}`}
                        onClick={() => setActiveLocationId(location.id)}
                        aria-expanded={isActive}
                      >
                        {location.name}
                      </button>
                      {isActive && <p>{location.address}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* * Partner collage */}
        <motion.div
          className="about-card about-card--partners"
          variants={itemVariants}
        >
          <h2>
            Trusted <span className="about-h2__accent">Partners</span>
          </h2>
          <div className="partner-collage">
            {partners.map((partner) => {
              const Card = (
                <article className="partner-card">
                  <div className="partner-card__logo">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                    />
                  </div>
                  <h3>{partner.name}</h3>
                </article>
              );

              return (
                <div key={partner.name} className="partner-link">
                  {Card}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* * Sister companies strip */}
        <motion.div
          className="about-card about-card--network"
          variants={itemVariants}
        >
          <h2>
            Our broader{" "}
            <span className="about-h2__accent">business network</span>
          </h2>
          <p className="about-card__eyebrow">
            Trusted sister companies, one shared standard
          </p>
          <p>
            We work in close alignment with our sister companies to extend
            operational reach, share specialist capability, and deliver a
            seamless client experience across regions.
          </p>
          <div className="about-network__logos">
            {sisterCompanies.map((company) => (
              <div key={company.name} className="about-network__logo">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
