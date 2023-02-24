import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Suspense } from 'react'
import { Spin } from 'antd'

ReactDOM.render(
  <Suspense fallback={<Spin />}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
)
