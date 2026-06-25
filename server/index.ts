import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  type GoogleReview = {
    name: string;
    rating: number;
    quote: string;
    relativeTime?: string;
    profilePhotoUrl?: string;
    source: "google";
  };

  let cachedReviews: { expiresAt: number; data: GoogleReview[] } | null = null;
  const cacheMs = Number(process.env.GOOGLE_REVIEWS_CACHE_MS || 1000 * 60 * 60 * 6);

  async function getBusinessProfileAccessToken() {
    const refreshToken = process.env.GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN;
    const clientId = process.env.GOOGLE_BUSINESS_PROFILE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET;

    if (!refreshToken || !clientId || !clientSecret) {
      return process.env.GOOGLE_BUSINESS_PROFILE_ACCESS_TOKEN || null;
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      throw new Error(`Google OAuth refresh failed: ${response.status}`);
    }

    const payload = (await response.json()) as { access_token?: string };
    return payload.access_token || null;
  }

  async function fetchBusinessProfileReviews(): Promise<GoogleReview[]> {
    const accountId = process.env.GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID;
    const locationId = process.env.GOOGLE_BUSINESS_PROFILE_LOCATION_ID;
    const accessToken = await getBusinessProfileAccessToken();

    if (!accountId || !locationId || !accessToken) return [];

    const url = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
    );
    url.searchParams.set("pageSize", process.env.GOOGLE_REVIEWS_LIMIT || "6");
    url.searchParams.set("orderBy", "updateTime desc");

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error(`Google Business Profile reviews failed: ${response.status}`);
    }

    const payload = (await response.json()) as {
      reviews?: Array<{
        reviewer?: { displayName?: string; profilePhotoUrl?: string };
        starRating?: string;
        comment?: string;
        updateTime?: string;
      }>;
    };

    return (payload.reviews || [])
      .filter(review => review.comment)
      .map(review => ({
        name: review.reviewer?.displayName || "Google reviewer",
        rating:
          {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            FOUR: 4,
            FIVE: 5,
          }[review.starRating || "FIVE"] || 5,
        quote: review.comment || "",
        relativeTime: review.updateTime
          ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              year: "numeric",
            }).format(new Date(review.updateTime))
          : undefined,
        profilePhotoUrl: review.reviewer?.profilePhotoUrl,
        source: "google" as const,
      }));
  }

  async function fetchPlacesReviews(): Promise<GoogleReview[]> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) return [];

    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "reviews");
    url.searchParams.set("reviews_sort", "newest");
    url.searchParams.set("key", apiKey);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Places reviews failed: ${response.status}`);
    }

    const payload = (await response.json()) as {
      result?: {
        reviews?: Array<{
          author_name?: string;
          profile_photo_url?: string;
          rating?: number;
          relative_time_description?: string;
          text?: string;
        }>;
      };
    };

    return (payload.result?.reviews || [])
      .filter(review => review.text)
      .map(review => ({
        name: review.author_name || "Google reviewer",
        rating: review.rating || 5,
        quote: review.text || "",
        relativeTime: review.relative_time_description,
        profilePhotoUrl: review.profile_photo_url,
        source: "google" as const,
      }));
  }

  app.get("/api/google-reviews", async (_req, res) => {
    try {
      if (cachedReviews && cachedReviews.expiresAt > Date.now()) {
        res.json({ reviews: cachedReviews.data, cached: true });
        return;
      }

      const businessProfileReviews = await fetchBusinessProfileReviews();
      const reviews =
        businessProfileReviews.length > 0
          ? businessProfileReviews
          : await fetchPlacesReviews();

      cachedReviews = {
        data: reviews,
        expiresAt: Date.now() + cacheMs,
      };

      res.json({ reviews, cached: false });
    } catch (error) {
      console.error(error);
      res.status(502).json({ reviews: [], error: "Unable to load Google reviews" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
