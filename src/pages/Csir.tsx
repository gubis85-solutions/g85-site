import "../styles/Csir.css";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import csrImageOne from "../assets/CSR/img_2_1770108909143.jpg";
import csrImageTwo from "../assets/CSR/img_3_1770108916691.jpg";
import csrImageThree from "../assets/CSR/img_5_1770108926677.jpg";

import {
  fetchCsrEvents,
  fetchCsrInitiatives,
  getStrapiMediaUrl,
  type CsrEvent,
  type CsrInitiative,
} from "../lib/strapi";

// Static gallery on the right side of the page
const csrGallery = [
  {
    src: csrImageOne,
    alt: "CSR drive distributing menstrual hygiene products to learners",
  },
  {
    src: csrImageTwo,
    alt: "CSR team handing out school shoes to disadvantaged students",
  },
  {
    src: csrImageThree,
    alt: "Community partners and learners during the CSR handover",
  },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatCalendarDate(
  date: string,
  options: Intl.DateTimeFormatOptions,
) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-ZA", options);
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function Csir() {
  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => toDateKey(today), [today]);
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [csrInitiatives, setCsrInitiatives] = useState<CsrInitiative[]>([]);
  const [initiativesLoading, setInitiativesLoading] = useState(true);
  const [initiativesError, setInitiativesError] = useState<string | null>(null);

  const [csrEvents, setCsrEvents] = useState<CsrEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadPageData() {
      setInitiativesLoading(true);
      setInitiativesError(null);
      setEventsLoading(true);
      setEventsError(null);

      const [initiativesResult, eventsResult] = await Promise.allSettled([
        fetchCsrInitiatives(),
        fetchCsrEvents(),
      ]);

      if (!mounted) {
        return;
      }

      if (initiativesResult.status === "fulfilled") {
        setCsrInitiatives(initiativesResult.value);
      } else {
        setInitiativesError(
          getErrorMessage(
            initiativesResult.reason,
            "Failed to load CSR initiatives.",
          ),
        );
      }
      setInitiativesLoading(false);

      if (eventsResult.status === "fulfilled") {
        setCsrEvents(eventsResult.value);
      } else {
        setEventsError(
          getErrorMessage(
            eventsResult.reason,
            "Failed to load CSR calendar events.",
          ),
        );
      }
      setEventsLoading(false);
    }

    void loadPageData();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedDate || csrEvents.length === 0) {
      return;
    }

    const nextEvent =
      csrEvents.find((event) => event.eventDate >= todayKey) ?? csrEvents[0];
    const [year, month] = nextEvent.eventDate.split("-").map(Number);

    setSelectedDate(nextEvent.eventDate);
    setCalendarMonth(new Date(year, month - 1, 1));
  }, [csrEvents, selectedDate, todayKey]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CsrEvent[]>();

    csrEvents.forEach((event) => {
      const existingEvents = map.get(event.eventDate) ?? [];
      existingEvents.push(event);
      map.set(event.eventDate, existingEvents);
    });

    return map;
  }, [csrEvents]);

  const initiativesByPubDate = useMemo(() => {
    const map = new Map<string, CsrInitiative[]>();

    csrInitiatives.forEach((initiative) => {
      if (!initiative.pubDate) return;
      const existing = map.get(initiative.pubDate) ?? [];
      existing.push(initiative);
      map.set(initiative.pubDate, existing);
    });

    return map;
  }, [csrInitiatives]);

  const calendarHasActivity = (dateKey: string) =>
    eventsByDate.has(dateKey) || initiativesByPubDate.has(dateKey);

  const monthLabel = calendarMonth.toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });

  const monthDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingBlankDays = firstDay.getDay();
    const slots: Array<{ key: string; day: number } | null> = [];

    for (let i = 0; i < leadingBlankDays; i += 1) {
      slots.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const monthValue = String(month + 1).padStart(2, "0");
      const dayValue = String(day).padStart(2, "0");
      const key = `${year}-${monthValue}-${dayValue}`;
      slots.push({ key, day });
    }

    return slots;
  }, [calendarMonth]);

  const selectedEvents = selectedDate ? eventsByDate.get(selectedDate) ?? [] : [];
  const selectedInitiatives = selectedDate ? initiativesByPubDate.get(selectedDate) ?? [] : [];

  const selectedLabel = selectedDate
    ? formatCalendarDate(selectedDate, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Select a highlighted date";

  const upcomingEvents = useMemo(() => {
    return csrEvents.filter((event) => event.eventDate >= todayKey);
  }, [csrEvents, todayKey]);

  const handlePrevMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1),
    );
  };

  const handleUpcomingSelect = (eventDate: string) => {
    const [year, month] = eventDate.split("-").map(Number);
    setCalendarMonth(new Date(year, month - 1, 1));
    setSelectedDate(eventDate);
  };

  const formatPubDate = (date?: string | null) => {
    if (!date) return null;

    return formatCalendarDate(date, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatUpcomingDate = (date: string) => {
    return formatCalendarDate(date, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="csir-page">
      <section className="page-hero">
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="page-hero__eyebrow">CSR</p>
          <h1>Community &amp; Social Responsibility</h1>
          <p className="page-hero__subtext">
            Practical initiatives that uplift communities, strengthen safety,
            and expand opportunity.
          </p>
          <div className="page-hero__chips">
            <span>Community Impact</span>
            <span>Youth Support</span>
            <span>Long-term Commitment</span>
          </div>
        </motion.div>
      </section>

      <section className="csir-content">
        <div className="csir-content__text">
          <h2>Community Support in Action</h2>
          <p>
            Our Corporate Social Responsibility initiative focuses on supporting
            communities in practical, meaningful ways. Through targeted
            programmes and trusted partnerships, we aim to remove barriers,
            restore dignity, and create lasting impact where support is needed
            most.
          </p>

          <div className="csir-initiatives">
            <h3>Current CSR Initiatives</h3>

            {initiativesLoading && <p>Loading initiatives...</p>}

            {initiativesError && (
              <p className="csir-initiatives__error">{initiativesError}</p>
            )}

            {!initiativesLoading && !initiativesError && csrInitiatives.length === 0 && (
              <p>No CSR initiatives have been added yet.</p>
            )}

            {!initiativesLoading && !initiativesError && csrInitiatives.length > 0 && (
              <ul>
                {csrInitiatives.map((initiative) => {
                  const firstImage = initiative.image?.[0];
                  const imageUrl = firstImage?.url
                    ? getStrapiMediaUrl(firstImage.url)
                    : "";

                  return (
                    <li key={initiative.id}>
                      {imageUrl ? (
                        <div className="csir-initiative__image-wrap">
                          <img
                            src={imageUrl}
                            alt={
                              firstImage.alternativeText ||
                              firstImage.name ||
                              initiative.title
                            }
                            className="csir-initiative__image"
                            loading="lazy"
                          />
                        </div>
                      ) : null}

                      <strong>{initiative.title}</strong>
                      <p>{initiative.summary}</p>
                      <span>{initiative.focus}</span>

                      {initiative.pubDate && (
                        <small className="csir-initiative__date">
                          {formatPubDate(initiative.pubDate)}
                        </small>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <p>
            Working alongside community partners, we respond to real needs with
            thoughtful support and consistent follow-through. Our aim is not
            only to assist in the moment, but to contribute toward stronger,
            safer, and more hopeful communities over time.
          </p>

          <div className="csir-impact">
            <div>
              <h3>What We Delivered</h3>
              <ul>
                <li>
                  <b>Essential care items</b> to support dignity, confidence,
                  and day-to-day wellbeing.
                </li>
                <li>
                  <b>Practical assistance</b> for learners and families facing
                  difficult circumstances.
                </li>
                <li>
                  <b>Encouragement and compassionate engagement</b> through
                  direct community interaction and support.
                </li>
              </ul>
            </div>
            <div>
              <h3>Our Commitment</h3>
              <p>
                We are committed to long-term community upliftment through
                targeted support, respectful partnerships, and consistent
                action that addresses real challenges with care and purpose.
              </p>
            </div>
          </div>
        </div>

        <div className="csir-gallery">
          {csrGallery.map((image) => (
            <figure key={image.src} className="csir-gallery__item">
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className="csir-calendar">
          <div className="csir-calendar__header">
            <div>
              <h3>CSR Calendar</h3>
              <p>
                Highlighted dates show upcoming CSR projects. Click a date to
                see the details.
              </p>
            </div>

            <div className="csir-calendar__nav">
              <button
                type="button"
                className="csir-calendar__nav-btn"
                onClick={handlePrevMonth}
              >
                Prev
              </button>
              <span className="csir-calendar__month">{monthLabel}</span>
              <button
                type="button"
                className="csir-calendar__nav-btn"
                onClick={handleNextMonth}
              >
                Next
              </button>
            </div>
          </div>

          <div className="csir-calendar__grid">
            {weekDays.map((day) => (
              <div key={day} className="csir-calendar__weekday">
                {day}
              </div>
            ))}

            {monthDays.map((slot, index) => {
              if (!slot) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="csir-calendar__empty"
                  />
                );
              }

              const hasEvent = calendarHasActivity(slot.key);
              const isSelected = slot.key === selectedDate;

              return (
                <button
                  key={slot.key}
                  type="button"
                  className={`csir-calendar__day${hasEvent ? " has-event" : ""}${
                    isSelected ? " is-selected" : ""
                  }`}
                  onClick={() => setSelectedDate(slot.key)}
                >
                  <span className="csir-calendar__day-num">{slot.day}</span>
                  {hasEvent && <span className="csir-calendar__dot" />}
                </button>
              );
            })}
          </div>

          <div className="csir-calendar__details">
            <span className="csir-calendar__label">Selected date</span>
            <h4>{selectedLabel}</h4>

            {eventsLoading && <p>Loading calendar events...</p>}

            {eventsError && (
              <p className="csir-calendar__error">{eventsError}</p>
            )}

            {!eventsLoading && !eventsError && selectedEvents.length === 0 && selectedInitiatives.length === 0 && (
              <p>No CSR event scheduled for this date.</p>
            )}

            {!eventsLoading && !eventsError && selectedInitiatives.length > 0 && (
              <div className="csir-calendar__details-list">
                {selectedInitiatives.map((initiative) => (
                  <article
                    key={`initiative-${initiative.id}`}
                    className="csir-calendar__details-item csir-calendar__details-item--initiative"
                  >
                    <strong>{initiative.title}</strong>
                    {initiative.focus && <span>{initiative.focus}</span>}
                    {initiative.summary && <p>{initiative.summary}</p>}
                  </article>
                ))}
              </div>
            )}

            {!eventsLoading && !eventsError && selectedEvents.length > 0 && (
              <div className="csir-calendar__details-list">
                {selectedEvents.map((event) => (
                  <article
                    key={event.id}
                    className="csir-calendar__details-item"
                  >
                    <strong>{event.title}</strong>
                    <p>{event.description}</p>
                    {event.location && <span>{event.location}</span>}
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="csir-calendar__upcoming">
            <span className="csir-calendar__label">Upcoming events</span>

            {eventsLoading && <p>Loading upcoming events...</p>}

            {eventsError && (
              <p className="csir-calendar__error">{eventsError}</p>
            )}

            {!eventsLoading && !eventsError && upcomingEvents.length === 0 && (
              <p>No upcoming CSR events have been scheduled yet.</p>
            )}

            {!eventsLoading && !eventsError && upcomingEvents.length > 0 && (
              <ul>
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <button
                      type="button"
                      className="csir-calendar__upcoming-item"
                      onClick={() => handleUpcomingSelect(event.eventDate)}
                    >
                      <span className="csir-calendar__upcoming-copy">
                        <span className="csir-calendar__upcoming-title">
                          {event.title}
                        </span>
                        {event.location && (
                          <span className="csir-calendar__upcoming-location">
                            {event.location}
                          </span>
                        )}
                      </span>
                      <span className="csir-calendar__upcoming-date">
                        {formatUpcomingDate(event.eventDate)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}