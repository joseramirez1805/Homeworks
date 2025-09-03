import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ComponentApp from './Padre'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentApp />
  </StrictMode>,
)
