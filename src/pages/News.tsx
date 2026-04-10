import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import "../styles/News.css";

const mediaStatementPdf = new URL(
  "../assets/media statement dated 09 April 2026[48].pdf",
  import.meta.url,
).href;

type StrapiImage = {
  url: string;
};

type NewsItem = {
  id: number;
  title: string;
  category: string;
  content: string;
  publishDate: string;
  featuredImage?: StrapiImage;
};

export default function News() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "https://g85-cms-backend-production.up.railway.app";

  useEffect(() => {
    fetch(`${API_URL}/api/news-feeds?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          content: item.Content, // * Strapi field is capitalized.
          publishDate: item.publishDate,
          featuredImage: item.featuredImage?.url
            ? { url: item.featuredImage.url }
            : undefined,
        }));

        setArticles(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, [API_URL]);

  const handleReadMore = (article: NewsItem) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="news-page">
        <p>Loading news...</p>
      </div>
    );
  }

  return (
    <div className="news-page">
      {/* * Hero */}
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="page-hero__eyebrow">News</p>
          <h1 className="news-heading">
            Latest <span className="news-heading__accent">Updates</span>
          </h1>
          <p className="page-hero__subtext">
            Security insights, company announcements, and operational briefings.
          </p>
          <div className="page-hero__chips">
            <span>Industry Intelligence</span>
            <span>Company Updates</span>
            <span>Expert Insights</span>
          </div>
        </motion.div>
      </section>

      {/* * Management Notice */}
      <motion.section
        className="news-notice"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="news-notice__content">
          <h2>Official Media Statement: Response to Allegations in the Justice Madlanga Commission of Inquiry</h2>
          <p className="news-notice__date">Date: 9 April 2026</p>
          <p>For the full statement, please download the PDF below.</p>
          <a href={mediaStatementPdf} download className="news-notice__download">
            Download PDF
          </a>
        </div>
      </motion.section>

      {/* * News feed */}
      <section className="news-filter">
        <div className="news-filter__header">
          {selectedArticle ? (
            <>
              <h2 className="news-section-heading">
                Article{" "}
                <span className="news-section-heading__accent">Focus</span>
              </h2>
              <p>
                Full publication view for deeper context, verified reporting,
                and strategic implications.
              </p>
            </>
          ) : (
            <>
              <h2 className="news-section-heading">
                Security Intelligence{" "}
                <span className="news-section-heading__accent">
                  Relevance Desk
                </span>
              </h2>
              <p>
                We curate and validate security-industry coverage for
                operational leaders and risk stakeholders.
              </p>
            </>
          )}
        </div>

        {selectedArticle ? (
          <motion.article
            className="news-article"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <button
              type="button"
              className="news-article__back"
              onClick={handleBackToList}
            >
              ← Back to all updates
            </button>

            <div className="news-article__meta">
              <span>{selectedArticle.category}</span>
              <span>
                {new Date(selectedArticle.publishDate).toLocaleDateString()}
              </span>
            </div>

            <h3 className="news-article__title">{selectedArticle.title}</h3>

            {selectedArticle.featuredImage?.url && (
              <img
                src={`${API_URL}${selectedArticle.featuredImage.url}`}
                alt={selectedArticle.title}
                className="news-article__image"
              />
            )}

            <div className="news-article__content">
              <ReactMarkdown>{selectedArticle.content || ""}</ReactMarkdown>
            </div>
          </motion.article>
        ) : (
          <div className="news-filter__grid">
            {articles.length === 0 && (
              <p>No published news articles available.</p>
            )}

            {articles.map((article) => {
              const imageUrl = article.featuredImage?.url
                ? `${API_URL}${article.featuredImage.url}`
                : null;

              return (
                <article key={article.id} className="news-card">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={article.title}
                      className="news-card__image"
                    />
                  )}

                  <div className="news-card__meta">
                    <span>{article.category}</span>
                    <span>
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3>{article.title}</h3>

                  <div className="news-card__content news-card__content--preview">
                    <ReactMarkdown>
                      {article.content
                        ? article.content.length > 300
                          ? `${article.content.substring(0, 300)}...`
                          : article.content
                        : ""}
                    </ReactMarkdown>
                  </div>

                  <button
                    type="button"
                    className="news-card__read-more"
                    onClick={() => handleReadMore(article)}
                  >
                    Read More
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
