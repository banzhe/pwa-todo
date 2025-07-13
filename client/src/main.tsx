import './index.css'
import { Routes } from '@generouted/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// biome-ignore lint/style/noNonNullAssertion: root is not null
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
