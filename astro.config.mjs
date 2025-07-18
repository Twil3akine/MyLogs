// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
    integrations: [
        starlight({
            title: "Twil3akine",
            plugins: [
                
            ],
            locales: {
                root: {
                    label: '日本語',
                    lang: 'ja',
                },
            },
            editLink: {
                baseUrl: 'https://github.com/twil3akine/MyLogs/src/content/docs/',
            },
            social: [
                {
                    icon: "twitter",
                    label: "Twitter",
                    href: "https://twitter.com/twil3akine"
                },
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/twil3akine"
                }
            ],
            sidebar: [
                {
                    label: '/',
                    link: '/',
                },
                {
                    label: '/problems',
                    link: '/problems',
                },
            ],
            pagination: false,
            
        }),
        mdx({
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        }),
    ],
    vite: {
        server: {
            host: "0.0.0.0",
            port: 4321,
            watch: {
                usePolling: true,
                interval: 1000,
            },
        },
    },
});