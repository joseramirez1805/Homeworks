import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FirstApp from './App.jsx'
import {App} from "./App.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <FirstApp h1= "Hola, mi primer componente" value = {0}/>
  </StrictMode>,
)