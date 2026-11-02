import type { APIRoute } from "astro";
import { createRssResponse } from "../lib/rss-feed";

export const GET: APIRoute = ({ site }) => createRssResponse("ja", site);
