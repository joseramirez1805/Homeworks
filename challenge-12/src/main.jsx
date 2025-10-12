import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from './store/store.jsx' 
//import { Registro } from './components/Register.jsx'
import { Crud } from './components/Crud.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <StrictMode>
      <Crud/>
    </StrictMode>
  </Provider>
)
