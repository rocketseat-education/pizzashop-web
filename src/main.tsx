import React from 'react'
import ReactDOM from 'react-dom/client'

import { enableMSW } from './api/mocks'
import { App } from './app'

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
