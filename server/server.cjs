const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const modelPath = path.resolve(__dirname, '..', 'src', 'assets', 'homepage-model.json');

console.log('Server file:', __filename);
console.log('Model path:', modelPath);
console.log('Model exists:', fs.existsSync(modelPath));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'aem-mock-api' });
});

app.get('/api/page-model', (_req, res) => {
  try {
    const raw = fs.readFileSync(modelPath, 'utf8').replace(/^\uFEFF/, '');
    const model = JSON.parse(raw);
    console.log('Page model loaded:', model.title);
    res.json(model);
  } catch (error) {
    console.error('Page model error:', error.stack || error);
    res.status(500).json({
      error: 'Unable to load the page model.',
      details: String(error.message || error)
    });
  }
});

app.listen(PORT, () => {
  console.log(`AEM mock API running at http://localhost:${PORT}`);
});
