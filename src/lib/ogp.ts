import { getCollection, type CollectionEntry } from "astro:content";
// フォントとキャラ画像は ?inline でバンドルに埋め込む（prerender時の実ファイル参照は dist 側で解決できないため）
// @ts-ignore: バイナリアセットのインライン読み込み
import regularFontDataUri from "../assets/fonts/NotoSansJP-Regular.otf?inline";
// @ts-ignore: バイナリアセットのインライン読み込み
import boldFontDataUri from "../assets/fonts/NotoSansJP-Bold.otf?inline";
// @ts-ignore: バイナリアセットのインライン読み込み
import characterDataUri from "../assets/ogp/character-lie.png?inline";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import {
  getLocalizedSlugPath,
  isPostLocale,
  isPublishedPost,
  type PostLocale,
} from "@/lib/content";

// 動的OGP画像の生成（1200x630）。
// デザインは Figma「MyLogs OGP」で確定したもの:
// 白カード / 左上にカテゴリチップと日付 / タイトル中央 / description はタイトルの左端揃え /
// 下端に GitHub 言語ゲージ風バー / 右下にドット絵ちびキャラ（寝そべり、透過PNG）。

const WIDTH = 1200;
const HEIGHT = 630;

const COLORS = {
  text: "#171717",
  description: "#525252",
  date: "#737373",
  border: "#696945",
  chipBlog: { color: "#3B82F6", background: "#EFF4FE" },
  chipArticle: { color: "#F97316", background: "#FEF5EE" },
  // GitHub 言語ゲージ風バー（左から Go / Rust / Nix / TypeScript / Astro）
  // 幅は Figma モックの実測値
  gauge: [
    { width: 330, color: "#00ADD8" },
    { width: 296, color: "#DEA584" },
    { width: 249, color: "#7EBAE4" },
    { width: 166, color: "#3178C6" },
    { width: 103, color: "#FF5D01" },
  ],
} as const;

export type OgKind = "blog" | "article";

let assetsPromise: Promise<{ fonts: any[]; characterSrc: string }> | null = null;

function dataUriToBuffer(uri: string) {
  return Buffer.from(uri.slice(uri.indexOf(",") + 1), "base64");
}

function loadAssets() {
  if (!assetsPromise) {
    assetsPromise = (async () => {
      return {
        fonts: [
          {
            name: "Noto Sans JP",
            data: dataUriToBuffer(regularFontDataUri as unknown as string),
            weight: 400,
            style: "normal",
          },
          {
            name: "Noto Sans JP",
            data: dataUriToBuffer(boldFontDataUri as unknown as string),
            weight: 700,
            style: "normal",
          },
        ],
        characterSrc: characterDataUri as unknown as string,
      };
    })();
  }
  return assetsPromise;
}

function formatDate(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

// 日本語は全角幅、英数字は約0.55として加重長で見積もる
function weightedLength(text: string) {
  return [...text].reduce(
    (sum, ch) => sum + (ch.charCodeAt(0) > 0xff ? 1 : 0.55),
    0,
  );
}

// 加重長ベースの切り詰め（lineClamp が効かない環境でもはみ出さないための担保）
function truncateWeighted(text: string, max: number) {
  if (weightedLength(text) <= max) return text;
  let acc = 0;
  let out = "";
  for (const ch of text) {
    acc += ch.charCodeAt(0) > 0xff ? 1 : 0.55;
    if (acc > max) break;
    out += ch;
  }
  return `${out}…`;
}

function titleFontSize(title: string) {
  const weighted = weightedLength(title);
  if (weighted <= 15) return 64;
  if (weighted <= 20) return 56;
  if (weighted <= 26) return 48;
  if (weighted <= 34) return 42;
  return 36;
}

export interface OgInput {
  title: string;
  description: string;
  date: Date;
  category: string;
  kind: OgKind;
}

export async function renderOgPng(input: OgInput): Promise<Buffer> {
  const { fonts, characterSrc } = await loadAssets();
  const chip = input.kind === "blog" ? COLORS.chipBlog : COLORS.chipArticle;

  const tree = {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#FFFFFF",
        position: "relative",
        display: "flex",
        fontFamily: "Noto Sans JP",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 28,
              left: 28,
              width: 1144,
              height: 574,
              borderWidth: 5,
              borderStyle: "solid",
              borderColor: COLORS.border,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 128,
              left: 118,
              display: "flex",
              alignItems: "center",
              gap: 68,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    backgroundColor: chip.background,
                    borderRadius: 12,
                    padding: "12px 26px",
                    fontSize: 44,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: chip.color,
                  },
                  children: input.category,
                },
              },
              {
                type: "div",
                props: {
                  style: { fontSize: 40, color: COLORS.date },
                  children: formatDate(input.date),
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: WIDTH,
              height: HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    maxWidth: 1032,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: titleFontSize(input.title),
                          fontWeight: 700,
                          lineHeight: 1.3,
                          color: COLORS.text,
                          lineClamp: 2,
                          wordBreak: "break-all",
                        },
                        children: truncateWeighted(input.title, 48),
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: 30,
                          lineHeight: 1.4,
                          color: COLORS.description,
                          marginTop: 24,
                          // 右下のキャラ（左端 x=830）に文字が届かないよう幅を制限する
                          maxWidth: 720,
                          lineClamp: 3,
                        },
                        children: truncateWeighted(input.description, 72),
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: 28,
              top: 560,
              width: 1144,
              height: 14,
              display: "flex",
              borderRadius: 7,
              overflow: "hidden",
            },
            children: COLORS.gauge.map((seg) => ({
              type: "div",
              props: {
                style: {
                  width: seg.width,
                  height: 14,
                  backgroundColor: seg.color,
                },
              },
            })),
          },
        },
        {
          type: "img",
          props: {
            src: characterSrc,
            width: 340,
            height: 277,
            style: { position: "absolute", left: 820, top: 297 },
          },
        },
      ],
    },
  };

  const svg = await satori(tree as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
    .render()
    .asPng();
  return Buffer.from(png);
}

export function ogImagePath(kind: OgKind, locale: PostLocale, slug: string) {
  return locale === "en" ? `/og/en/${kind}/${slug}.png` : `/og/${kind}/${slug}.png`;
}

export async function ogStaticPaths(kind: OgKind, locale: PostLocale) {
  const posts = (await getCollection(kind)).filter(isPublishedPost);
  return posts
    .filter((post) => isPostLocale(post, locale))
    .map((post) => ({
      params: { slug: getLocalizedSlugPath(post) },
      props: { post },
    }));
}

export async function ogResponse(post: CollectionEntry<OgKind>, kind: OgKind) {
  const png = await renderOgPng({
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    category: post.data.category,
    kind,
  });
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
