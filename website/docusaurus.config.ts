import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RLM-REPL',
  tagline: 'Recursive Language Model with REPL Inference Strategy - Unlimited context management using SQL-based retrieval',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://labKnowledge.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // If deploying to root domain, use '/'
  baseUrl: '/rlm-repl/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'labKnowledge', // Usually your GitHub org/user name.
  projectName: 'rlm-repl', // Usually your repo name.

  onBrokenLinks: 'warn', // Changed to warn so build doesn't fail on broken links

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/labKnowledge/rlm-repl/tree/master/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/labKnowledge/rlm-repl/tree/master/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'RLM-REPL',
      logo: {
        alt: 'RLM-REPL Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://pypi.org/project/rlm-repl/',
          label: 'PyPI',
          position: 'right',
        },
        {
          href: 'https://github.com/labKnowledge/rlm-repl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference',
            },
            {
              label: 'Examples',
              to: '/docs/examples',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'PyPI Package',
              href: 'https://pypi.org/project/rlm-repl/',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/labKnowledge/rlm-repl',
            },
            {
              label: 'Issues',
              href: 'https://github.com/labKnowledge/rlm-repl/issues',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Architecture',
              to: '/docs/architecture',
            },
            {
              label: 'Configuration',
              to: '/docs/configuration',
            },
            {
              label: 'Troubleshooting',
              to: '/docs/troubleshooting',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Remy Gakwaya. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
