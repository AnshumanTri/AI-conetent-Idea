const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cohere = require('cohere-ai');

// Initialize Cohere with your API key
require('dotenv').config();
cohere.init(process.env.COHERE_API_KEY);


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve React build folder static files
app.use(express.static(path.join(__dirname, '../client/build')));

// API endpoint to generate idea
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
      temperature: 0.8
    });

    const idea = response.body.generations[0].text.trim();
    res.status(200).json({ idea });
  } catch (error) {
    console.error('Cohere API error:', error);
    res.status(500).json({ error: 'Failed to generate idea using Cohere AI' });
  }
});

// Catch-all handler to serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
