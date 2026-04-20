import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CivicTwin AI',
  tagline: 'Nền tảng Digital Twin & AI cho Quản lý Đô thị Thông minh',
  favicon: 'logo.png',
  url: 'https://asean-ai-dz.github.io',
  baseUrl: '/CivicTwinDocument/',
  organizationName: 'ASEAN-AI-DZ',
  projectName: 'CivicTwinDocument',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  deploymentBranch: 'gh-pages',
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/ASEAN-AI-DZ/CivicTwinDocument/edit/master/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [{ name: 'keywords', content: 'digital twin, smart city, urban management, AI prediction, urban planning, IoT, geospatial' }],
    image: 'img/Banner.png',
    navbar: {
      title: 'CivicTwin AI',
      logo: {
        alt: 'CivicTwin AI Logo',
        src: '/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ASEAN-AI-DZ/CivicTwinDocument',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/intro',
            },
            {
              label: 'Architecture',
              to: '/Architecture',
            },
            {
              label: 'Installation',
              to: '/Installation',
            },
            {
              label: 'Services',
              to: '/Services',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ASEAN-AI-DZ/CivicTwinDocument',
            },
            {
              label: 'Issues',
              href: 'https://github.com/ASEAN-AI-DZ/CivicTwinDocument/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/ASEAN-AI-DZ/CivicTwinDocument/discussions',
            },
          ],
        },
        {
          title: 'Team',
          items: [
            {
              label: 'Lê Thanh Trường',
              href: 'mailto:thanhtruong23111999@gmail.com',
            },
            {
              label: 'Nguyễn Văn Nhân',
              href: 'mailto:vannhan130504@gmail.com',
            },
            {
              label: 'Nguyễn Ngọc Duy Thái',
              href: 'mailto:kkdn011@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CivicTwin AI. Developed for ASEAN Smart Cities. Built with ❤️ for Evidence-Based Urban Governance.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
