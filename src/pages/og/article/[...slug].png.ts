import type { APIRoute } from "astro";
import { ogResponse, ogStaticPaths, type OgKind } from "@/lib/ogp";

export async function getStaticPaths() {
  return ogStaticPaths("article" as OgKind, "ja");
}

export const GET: APIRoute = async ({ props }) => {
  return ogResponse((props as any).post, "article" as OgKind);
};
