const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cohere = require('cohere-ai');
const path = require('path');

cohere.init('AeZCf2uFn91KjWfH1kFTVet4oG48BBmfACwc7CWA');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve the React build
const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

// API Endpoint
app.post('/generate-idea', async (req, res) => {
  const { topic } = req.body;

  if (!topic || topic.trim() === '') {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const response = await cohere.generate({
      model: 'command-r-plus',
      prompt: `Give me a unique and creative content idea for the topic: "${topic}"`,
      max_tokens: 100,
      temperature: 0.8,
    });

    const idea = response.body.generations[0].text.trim();
    res.status(200).json({ idea });
  } catch (error) {
    console.error('Cohere API error:', error);
    res.status(500).json({ error: 'Failed to generate idea using Cohere AI' });
  }
});

// Fallback for React Router (for all GET routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
