import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./app/App";
import { PreferencesProvider } from "./app/PreferencesContext";
import { validateContent } from "./lib/validateContent";
import "./styles/index.css";

validateContent();
createRoot(document.getElementById("root")!).render(
  <StrictMode><PreferencesProvider><HashRouter><App /></HashRouter></PreferencesProvider></StrictMode>
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`));
}
