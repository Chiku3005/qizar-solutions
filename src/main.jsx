import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import AOS from "aos";
import "aos/dist/aos.css";


// ==========================================
// AOS ANIMATION
// ==========================================

AOS.init({
  duration: 1000,
  once: true,
});


// ==========================================
// RENDER APPLICATION
// ==========================================

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </React.StrictMode>

);