import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TransactionsProvider } from "./context/TransactionContext";

ReactDOM.render(
  <TransactionsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TransactionsProvider>,

  document.getElementById("root")
);
