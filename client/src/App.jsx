import React from 'react';
import './App.css';
import IdeaForm from './components/IdeaForm';

function App() {
  return (
    <div className="app">
      <div className="card">
        <h1> AI-Powered Content Idea Generator</h1>
        <IdeaForm />
      </div>
    </div>
  );
}

export default App;
