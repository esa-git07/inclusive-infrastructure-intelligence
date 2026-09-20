import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { runGeminiVisionAnalysis } from './api/analyze';

function geminiDevApiPlugin(apiKey: string) {
  return {
    name: 'gemini-dev-api-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/analyze', async (req: any, res: any) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          });
          return res.end();
        }

        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        let bodyStr = '';
        req.on('data', (chunk: any) => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          try {
            const body = JSON.parse(bodyStr || '{}');
            const { photoData } = body;
            if (!photoData) {
              res.writeHead(400);
              return res.end(JSON.stringify({ success: false, error: 'Missing photoData' }));
            }

            const result = await runGeminiVisionAnalysis(photoData, apiKey || process.env.GEMINI_API_KEY);
            res.writeHead(200);
            return res.end(JSON.stringify(result));
          } catch (err: any) {
            res.writeHead(200);
            return res.end(JSON.stringify({ success: false, error: err.message, fallback: true }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

  return {
    plugins: [react(), geminiDevApiPlugin(apiKey)],
  };
});
