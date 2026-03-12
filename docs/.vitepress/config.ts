import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Icons',
  description: 'React Icons to SVG Exporter — documentation',
  base: '/icons/docs/',
  outDir: '../build/docs',
  themeConfig: {
    nav: [{ text: 'App', link: 'https://fjacquet.github.io/icons/' }],
    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Product Requirements', link: '/prd' },
          { text: 'Engineering Constitution', link: '/constitution' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/fjacquet/icons' }],
  },
});
