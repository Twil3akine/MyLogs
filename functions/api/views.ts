const TRACKED_PATH_PREFIXES = [
  "/article/",
  "/blog/",
  "/en/article/",
  "/en/blog/",
] as const;

const jsonHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

function jsonResponse(body: object, status = 200) {
  return Response.json(body, { status, headers: jsonHeaders });
}

function isTrackedPath(path: string | null): path is string {
  if (
    !path ||
    path.length > 512 ||
    !path.endsWith("/") ||
    path.includes("//") ||
    path.includes("\\") ||
    path.includes("?") ||
    path.includes("#")
  ) {
    return false;
  }

  const prefix = TRACKED_PATH_PREFIXES.find((candidate) => path.startsWith(candidate));
  if (!prefix) {
    return false;
  }

  const slugSegments = path.slice(prefix.length, -1).split("/");
  return slugSegments.every(
    (segment) => segment.length > 0 && segment !== "." && segment !== "..",
  );
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: `Method ${context.request.method} not allowed` }),
      {
        status: 405,
        headers: { ...jsonHeaders, Allow: "POST" },
      },
    );
  }

  const requestURL = new URL(context.request.url);
  const origin = context.request.headers.get("Origin");

  if (origin !== requestURL.origin) {
    return jsonResponse({ error: "Forbidden" }, 403);
  }

  const path = context.request.headers.get("X-Page-Path");
  if (!isTrackedPath(path)) {
    return jsonResponse({ error: "Invalid page path" }, 400);
  }

  try {
    const result = await context.env.PAGE_VIEWS_DB.prepare(
      `INSERT INTO page_views (path, views)
       VALUES (?1, 1)
       ON CONFLICT(path) DO UPDATE SET
         views = page_views.views + 1
       RETURNING views`,
    )
      .bind(path)
      .first<{ views: number }>();

    if (!result) {
      throw new Error("Page view counter did not return a result");
    }

    return jsonResponse({ views: result.views });
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Failed to update page view count",
        path,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return jsonResponse({ error: "Unable to update page view count" }, 500);
  }
};
