import React, { useState } from 'react';

const IdeaForm = () => {
  const [topic, setTopic] = useState('');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdea('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (response.ok) {
        setIdea(data.idea);
      } else {
        setIdea(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setIdea('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a topic or theme..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Idea'}
        </button>
      </form>
      {idea && <div className="result">{idea}</div>}
    </>
  );
};

export default IdeaForm;
