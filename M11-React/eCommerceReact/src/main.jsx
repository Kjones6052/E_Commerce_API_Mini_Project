// This file is the code to run the main App file with React Strict Mode and Browser Router

// Import as needed
import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

// Run App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
