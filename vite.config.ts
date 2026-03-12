import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/icons/',
  build: { outDir: 'build' },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    server: {
      deps: { inline: ['@threeveloper/azure-react-icons'] },
    },
    onConsoleLog: (log) => (log.includes('Sourcemap') ? false : undefined),
  },
});
