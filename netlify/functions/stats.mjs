import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore({ name: "pdf-stats", consistency: "strong" });
  const [views, downloads] = await Promise.all([
    store.get("views", { type: "json" }),
    store.get("downloads", { type: "json" }),
  ]);
  return Response.json(
    { views: Number(views) || 0, downloads: Number(downloads) || 0 },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } }
  );
};
