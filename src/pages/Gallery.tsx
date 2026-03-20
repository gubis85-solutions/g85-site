import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "../styles/Gallery.css";

// Import all gallery images
import img1 from "../assets/Gallery/DJI_20260206080940_0046_D.JPG";
import img2 from "../assets/Gallery/DJI_20260206081316_0057_D.JPG";
import img3 from "../assets/Gallery/DJI_20260206085052_0087_D.JPG";
import img4 from "../assets/Gallery/Gubis85-Solutions_168.jpg";
import img5 from "../assets/Gallery/Gubis85-Solutions_172.jpg";
import img6 from "../assets/Gallery/Gubis85-Solutions_176.jpg";
import img7 from "../assets/Gallery/Gubis85-Solutions_178.jpg";
import img8 from "../assets/Gallery/Gubis85-Solutions_179.jpg";
import img9 from "../assets/Gallery/Gubis85-Solutions_196.jpg";
import img10 from "../assets/Gallery/Gubis85-Solutions_203.jpg";
import img11 from "../assets/Gallery/Gubis85-Solutions_220.jpg";
import img12 from "../assets/Gallery/Gubis85-Solutions_221.jpg";
import img13 from "../assets/Gallery/Gubis85-Solutions_244.jpg";
import img14 from "../assets/Gallery/Gubis85-Solutions_245.jpg";
import img15 from "../assets/Gallery/Gubis85-Solutions_247.jpg";
import img16 from "../assets/Gallery/Gubis85-Solutions_251.jpg";
import img17 from "../assets/Gallery/Gubis85-Solutions_68.jpg";
import img18 from "../assets/Gallery/Gubis85-Solutions_69.jpg";
import img19 from "../assets/Gallery/Gubis85-Solutions_82.jpg";
import img20 from "../assets/Gallery/Gubis85-Solutions_86.jpg";
import img21 from "../assets/Gallery/Gubis85-Solutions_94.jpg";
import img22 from "../assets/Gallery/Gubis85-Solutions_97.jpg";
import img23 from "../assets/Gallery/Gubis85-Solutions_99.jpg";

type CollageImage = {
  id: number;
  src: string;
  alt: string;
  col: string;
  row: string;
};

// Each item has explicit col/row spans for a non-uniform magazine layout
const collageImages: CollageImage[] = [
  { id: 1,  src: img1,  alt: "Aerial operations view 1",      col: "span 3", row: "span 2" },
  { id: 2,  src: img2,  alt: "Aerial operations view 2",      col: "span 2", row: "span 3" },
  { id: 3,  src: img3,  alt: "Aerial operations view 3",      col: "span 1", row: "span 1" },
  { id: 4,  src: img4,  alt: "Gubis85 operations",            col: "span 1", row: "span 2" },
  { id: 5,  src: img5,  alt: "Team in action",                col: "span 2", row: "span 1" },
  { id: 6,  src: img6,  alt: "Field deployment",              col: "span 1", row: "span 1" },
  { id: 7,  src: img7,  alt: "Security personnel",            col: "span 2", row: "span 2" },
  { id: 8,  src: img8,  alt: "On-site coordination",          col: "span 1", row: "span 1" },
  { id: 9,  src: img9,  alt: "Gubis85 team",                  col: "span 3", row: "span 2" },
  { id: 10, src: img10, alt: "Operations briefing",           col: "span 1", row: "span 2" },
  { id: 11, src: img11, alt: "Team deployment",               col: "span 2", row: "span 1" },
  { id: 12, src: img12, alt: "Security environment",          col: "span 1", row: "span 1" },
  { id: 13, src: img13, alt: "Guard post",                    col: "span 1", row: "span 2" },
  { id: 14, src: img14, alt: "Field team",                    col: "span 3", row: "span 1" },
  { id: 15, src: img15, alt: "Patrol unit",                   col: "span 2", row: "span 2" },
  { id: 16, src: img16, alt: "Gubis85 site",                  col: "span 1", row: "span 1" },
  { id: 17, src: img17, alt: "Crew assembly",                 col: "span 1", row: "span 1" },
  { id: 18, src: img18, alt: "Operational team",              col: "span 2", row: "span 1" },
  { id: 19, src: img19, alt: "Response unit",                 col: "span 1", row: "span 2" },
  { id: 20, src: img20, alt: "Close protection",              col: "span 2", row: "span 2" },
  { id: 21, src: img21, alt: "Site surveillance",             col: "span 1", row: "span 1" },
  { id: 22, src: img22, alt: "Team coordination",             col: "span 2", row: "span 1" },
  { id: 23, src: img23, alt: "Operations summary",            col: "span 1", row: "span 1" },
];

export default function Gallery() {
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const activeImage = collageImages.find((img) => img.id === activeImageId);

  const closeLightbox = () => setActiveImageId(null);

  const showNextImage = () => {
    setActiveImageId((current) => {
      if (current === null) return null;
      const currentIndex = collageImages.findIndex((img) => img.id === current);
      return collageImages[(currentIndex + 1) % collageImages.length].id;
    });
  };

  const showPreviousImage = () => {
    setActiveImageId((current) => {
      if (current === null) return null;
      const currentIndex = collageImages.findIndex((img) => img.id === current);
      return collageImages[
        (currentIndex - 1 + collageImages.length) % collageImages.length
      ].id;
    });
  };

  return (
    <div className="gallery-page">
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="page-hero__eyebrow">Gallery</p>
          <h1 className="gallery-heading">
            Company <span className="gallery-heading__accent">Gallery</span>
          </h1>
          <p className="page-hero__subtext">
            Explore an interactive collage of our operations, field moments, and
            day-to-day environments.
          </p>
          <div className="page-hero__chips">
            <span>Office Environment</span>
            <span>Operational Excellence</span>
            <span>Field Operations</span>
          </div>
        </motion.div>
      </section>

      <section className="gallery-shell">
        <div className="gallery-shell__header">
          <h2>
            Field Moments &amp;{" "}
            <span className="gallery-shell__accent">Office Life</span>
          </h2>
          <p>
            Select any image to view it in full and navigate through the
            collage.
          </p>
        </div>

        <motion.div
          className="collage-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {collageImages.map((image) => (
            <motion.button
              key={image.id}
              className="collage-item"
              style={{ gridColumn: image.col, gridRow: image.row }}
              onClick={() => setActiveImageId(image.id)}
              variants={{
                hidden: { opacity: 0, scale: 0.88 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
              }}
              whileHover={{ scale: 1.04, zIndex: 10 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              aria-label={`Open ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="collage-item__image"
              />
              <div className="collage-item__overlay">
                <div className="collage-item__zoom-icon">&#x2315;</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded gallery image"
          >
            <button
              type="button"
              className="gallery-lightbox__close"
              onClick={closeLightbox}
              aria-label="Close gallery image"
            >
              ✕
            </button>

            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                showPreviousImage();
              }}
              aria-label="View previous image"
            >
              ‹
            </button>

            <motion.img
              key={activeImage.id}
              src={activeImage.src}
              alt={activeImage.alt}
              className="gallery-lightbox__image"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              aria-label="View next image"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
