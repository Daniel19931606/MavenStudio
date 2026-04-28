import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log("MAVEN STUDIO ENGINE: STARTING...");

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("MAVEN STUDIO ENGINE: RENDER SUCCESSFUL.");
} catch (error) {
  console.error("MAVEN STUDIO ENGINE CRITICAL ERROR:", error);
}
