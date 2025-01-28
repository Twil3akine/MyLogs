// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import starlightObsidianPlugin from 'starlight-obsidian';

export default defineConfig({
    integrations: [
        starlight({
            title: "Twnxs",
            plugins: [
                // @ts-ignore
                starlightObsidianPlugin({
                    vault: "./MyLogs",
                    ignore: [
                        '_Templates',
                    ],
                }),
            ],
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
            },
            editLink: {
                baseUrl: 'https://github.com/twil3akine/MyLogs/src/content/docs/',
            },
            customCss: [
                './src/tailwind.css',
                '@fontsource/ubuntu-mono/400.css',
                '@fontsource/ubuntu-mono/700.css',
            ],
            social: {
                github: 'https://github.com/twil3akine/MyLogs',
            },
            sidebar: [
                {
                    label: 'Main.twnx',
                    link: '/',
                },
                {
                    label: 'AtCoder Logs',
                    autogenerate: { directory: '/notes/logs/' },
                    collapsed: true,
                },
                {
                    label: 'Problems',
                    autogenerate: { directory: '/notes/problems/' },
                    collapsed: true,
                },
                {
                    label: 'Blog',
                    autogenerate: { directory: '/notes/blogs' },
                    collapsed: true,
                },
            ],
            pagination: false,
            
        }),
        tailwind({
            applyBaseStyles: false,
        }),
        react()
    ],
});