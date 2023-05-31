import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './sass/style.scss';

import axios from "axios";
import { BACKEND_URL } from "./utils/secrets";

axios.defaults.baseURL = BACKEND_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
