import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Badger Utils",
  description: "Javascript Utilities",
  head: [['link', { rel: 'icon', href: '/badger-utils/images/badger3.svg' }]],
  base: '/badger-utils/',
  outDir: '../docs',
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'Badger Utils',
    logo: '/images/badger3.svg',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Assertions', link: '/assertions' },
          { text: 'Numbers', link: '/numbers' },
          { text: 'Text', link: '/text' },
          { text: 'Objects', link: '/objects' },
          { text: 'Functions', link: '/functions' },
          { text: 'Select', link: '/select' },
          { text: 'Sort', link: '/sort' },
          { text: 'Timing', link: '/timing' },
          { text: 'Errors', link: '/errors' },
          { text: 'Miscellaneous', link: '/misc' },
        ]
      },
      { text: 'Reference', link: '/reference' },
    ],
    sidebar: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Assertions', link: '/assertions' },
      { text: 'Numbers', link: '/numbers' },
      { text: 'Text', link: '/text' },
      { text: 'Objects', link: '/objects' },
      { text: 'Functions', link: '/functions' },
      { text: 'Select', link: '/select' },
      { text: 'Sort', link: '/sort' },
      { text: 'Timing', link: '/timing' },
      { text: 'Errors', link: '/errors' },
      { text: 'Miscellaneous', link: '/misc' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/abw/badger-utils' }
    ],
    footer: {
      message: 'Built by Badgers',
      copyright: '©️ Andy Wardley 2022-2024'
    }
  }
})
