import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-form-handler',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && (req.url === '/' || req.url?.startsWith('/?'))) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('OK');
            return;
          }
          next();
        });
      },
    },
  ],
});
