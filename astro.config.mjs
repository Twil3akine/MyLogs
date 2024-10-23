// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import starlightObsidianPlugin from 'starlight-obsidian';

// import { PageSidebar, PageNavigation } from 'astro:components';

export default defineConfig({
    integrations: [
        starlight({
            title: "Twnxs",
            // logo: {
            //     src: './src/assets/Angel.jpg',
            //     replacesTitle: true,
            // },
            plugins: [
                // @ts-ignore
                starlightObsidianPlugin({
                    vault: "/mnt/c/Users/twil3/MyPages",
                    ignore: [
                        '_Templates',
                    ],
                }),
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
            customCss: [
                './src/tailwind.min.css',
                '@fontsource/ubuntu-mono/400.css',
                '@fontsource/ubuntu-mono/700.css',
                // "C:\\Users\\twil3\\serverApp\\Starlight\\MyLogs\\node_modules\\@fontsource\\ubuntu-mono\\400.css",
                // "C:\\Users\\twil3\\serverApp\\Starlight\\MyLogs\\node_modules\\@fontsource\\ubuntu-mono\\600.css",
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
                    autogenerate: { directory: 'Blog/' },
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