import "../styles/NewPage.css";

export default function NewPage() {
  return (
    <div className="new-page">
      {/* * Hero intro */}
      <section className="page-hero radar-hero">
        <div className="page-hero__content radar-hero__content">
          <p className="page-hero__eyebrow">New Page</p>
          <h1>Welcome to Our New Page</h1>
          <p className="page-hero__subtext">
            A flexible template you can customize with new content and
            announcements.
          </p>
        </div>
      </section>
      {/* * Main content area */}
      <section className="content">
        <h2>Welcome to Our New Page</h2>
        <p>This is a new page template. You can add your own content here.</p>
        <p>
          This page demonstrates how easy it is to add new pages to your Gubis85
          Security Service website.
        </p>
      </section>
    </div>
  );
}
