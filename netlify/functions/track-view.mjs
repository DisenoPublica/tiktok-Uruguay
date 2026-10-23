import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore({ name: "pdf-stats", consistency: "strong" });
  for (let i = 0; i < 5; i++) {
    const cur = await store.getWithMetadata("views", { type: "json" });
    const next = (Number(cur?.data) || 0) + 1;
    const res = cur
      ? await store.setJSON("views", next, { onlyIfMatch: cur.etag })
      : await store.setJSON("views", next, { onlyIfNew: true });
    if (res?.modified !== false) return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }
  return new Response(null, { status: 409 });
};
