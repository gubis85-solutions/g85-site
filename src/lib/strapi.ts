const STRAPI_URL = (
  import.meta.env.VITE_STRAPI_URL ||
  import.meta.env.VITE_API_URL ||
  "https://g85-cms-backend-production.up.railway.app"
).replace(/\/+$/, "");

type StrapiCollectionResponse<T> = {
  data?: T[];
};

export type StrapiImage = {
  id: number;
  url: string;
  alternativeText?: string | null;
  name?: string | null;
};

export type CsrInitiative = {
  id: number;
  title: string;
  summary: string;
  focus: string;
  displayOrder: number;
  pubDate?: string | null;
  image: StrapiImage[];
};

export type CsrEvent = {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location?: string | null;
  displayOrder: number;
};

export type GalleryItem = {
  id: string;
  image: string;
  alt: string;
};

export function getStrapiMediaUrl(url?: string | null) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return url.startsWith("/") ? `${STRAPI_URL}${url}` : `${STRAPI_URL}/${url}`;
}

async function fetchStrapiCollection<T>(
  endpoint: string,
  errorLabel: string,
  mapItem: (item: any, index: number) => T,
): Promise<T[]> {
  const response = await fetch(`${STRAPI_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${errorLabel}: ${response.status}`);
  }

  const json = (await response.json()) as StrapiCollectionResponse<any>;

  return (json.data || []).map(mapItem);
}

export async function fetchCsrInitiatives(): Promise<CsrInitiative[]> {
  return fetchStrapiCollection(
    "/api/csr-initiatives?sort[0]=displayOrder:asc&populate=image",
    "CSR initiatives",
    (item) => ({
      id: item.id,
      title: item.title ?? "",
      summary: item.summary ?? "",
      focus: item.focus ?? "",
      displayOrder: item.displayOrder ?? 0,
      pubDate: item.pubDate ?? null,
      image: Array.isArray(item.image) ? item.image : [],
    }),
  );
}

export async function fetchCsrEvents(): Promise<CsrEvent[]> {
  return fetchStrapiCollection(
    "/api/csr-events?sort[0]=eventDate:asc&sort[1]=displayOrder:asc",
    "CSR events",
    (item) => ({
      id: item.id,
      title: item.title ?? "",
      description: item.description ?? "",
      eventDate: item.eventDate ?? "",
      location: item.location ?? null,
      displayOrder: item.displayOrder ?? 0,
    }),
  );
}

function getEntryFields(item: any) {
  return item?.attributes ?? item ?? {};
}

function getEntryMedia(entry: any) {
  const mediaCandidate = entry.image ?? null;

  if (!mediaCandidate) {
    return null;
  }

  if (Array.isArray(mediaCandidate)) {
    return mediaCandidate[0] ?? null;
  }

  if (mediaCandidate.data !== undefined) {
    const data = Array.isArray(mediaCandidate.data)
      ? mediaCandidate.data[0]
      : mediaCandidate.data;

    if (!data) {
      return null;
    }

    return data.attributes ? { ...data, ...data.attributes } : data;
  }

  return mediaCandidate.attributes
    ? { ...mediaCandidate, ...mediaCandidate.attributes }
    : mediaCandidate;
}

function getMediaUrl(media: any) {
  const preferredUrl =
    media?.url ||
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url ||
    media?.formats?.thumbnail?.url;

  return getStrapiMediaUrl(preferredUrl);
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/gal-imgs?populate=image`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch gallery items: ${response.status}`);
  }

  const json = (await response.json()) as StrapiCollectionResponse<any>;

  return (json.data || [])
    .map((rawItem, index) => {
      const entry = getEntryFields(rawItem);
      const media = getEntryMedia(entry);
      const imageUrl = getMediaUrl(media);

      if (!imageUrl) {
        return null;
      }

      const generatedAlt = `Gallery image ${index + 1}`;
      const alt =
        media?.alternativeText?.trim() ||
        media?.name?.trim() ||
        generatedAlt;

      return {
        id: String(rawItem?.id ?? entry.id ?? index + 1),
        image: imageUrl,
        alt,
      };
    })
    .filter((item): item is GalleryItem => item !== null);
}