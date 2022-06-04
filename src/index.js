import React from 'react'
import { createRoot } from 'react-dom/client'

import { JournalApp } from './JournalApp'
import 'animate.css'
import './styles/styles.scss'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<JournalApp />)
