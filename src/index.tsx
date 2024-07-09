import React from 'react'
import './styles/global.css'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<h1>Hello React!</h1>)