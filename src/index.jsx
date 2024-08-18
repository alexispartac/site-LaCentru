import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./app";
import { CartProvider } from "./context/cart";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>  
    </StrictMode>
);