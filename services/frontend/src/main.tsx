import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

import axios from "axios";
import { BACKEND_URL } from "./utils/secrets";

axios.defaults.baseURL = BACKEND_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
