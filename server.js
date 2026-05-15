const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

// ✅ Apni Gemini API key yahan paste karo
const GEMINI_API_KEY = 'AIzaSyDhQsopRRyYl0p34_V53_tLIoucfunw3Nk';
const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // =====================
  // GEMINI API PROXY
  // =====================
  if (req.method === 'POST' && req.url === '/api/analyze') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const incoming = JSON.parse(body);

        // Gemini ka request format
        const geminiBody = JSON.stringify({
          contents: [{
            parts: incoming.parts  // ai-tools.html se parts aayenge
          }]
        });

        const options = {
          hostname: 'generativelanguage.googleapis.com',
          path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(geminiBody)
          }
        };

        const proxyReq = https.request(options, proxyRes => {
          let data = '';
          proxyRes.on('data', chunk => data += chunk);
          proxyRes.on('end', () => {
            try {
              const geminiRes = JSON.parse(data);
              // Gemini response se text nikalo
              const text = geminiRes?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ result: text }));
            } catch (e) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: 'Failed to parse Gemini response' }));
            }
          });
        });

        proxyReq.on('error', err => {
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        });

        proxyReq.write(geminiBody);
        proxyReq.end();

      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid request body' }));
      }
    });
    return;
  }

  // =====================
  // STATIC FILE SERVER
  // =====================
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`✅ HealDotIndia running at http://localhost:${PORT}`);
  console.log(`📡 Gemini proxy ready`);
  console.log(`🌐 Open: http://localhost:${PORT}/ai-tools.html`);
});
