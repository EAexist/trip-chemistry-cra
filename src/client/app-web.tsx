import React, { FunctionComponent } from 'react'
import { Route, Link, Routes } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('./pages/home'))
const About = loadable(() => import('./pages/about'))

const App: FunctionComponent = () => {
  return (
    <div>
      <nav>
        <h2>Navigation</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
