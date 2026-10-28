import type { APIRoute } from "astro";
import { ogResponse, ogStaticPaths, type OgKind } from "@/lib/ogp";

export async function getStaticPaths() {
  return ogStaticPaths("blog" as OgKind, "ja");
}

export const GET: APIRoute = async ({ props }) => {
  return ogResponse((props as any).post, "blog" as OgKind);
};
