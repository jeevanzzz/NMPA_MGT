
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  window.onerror = function(message, source, lineno, colno, error) {
    document.body.innerHTML += '<div style="color:red; z-index:9999; position:absolute; top:0; background:white; padding:20px; width: 100%;">' + message + '<br>' + source + ':' + lineno + '<br>' + (error?.stack || '') + '</div>';
  };

  createRoot(document.getElementById("root")!).render(<App />);
  