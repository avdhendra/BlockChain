import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BlockchainProvider} from "./context/BlockchainContext"
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlockchainProvider>
    <ChakraProvider>
      <Router> 
           <App />
      </Router>

    </ChakraProvider>
    </BlockchainProvider>
  </React.StrictMode>
);


