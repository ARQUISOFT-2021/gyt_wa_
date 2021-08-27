import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const history = useHistory()

  useEffect(() => {
    localStorage.clear()
  })

  const handleClick = route => history.push(`/${route}`)

  return (
    <div className="Home">
      <header className="Home-header">
        <ul>
          <li className="Home-header--brand">GOODS & TRANSPORT</li>
          <li>
            <ul className="Home-header-menu">
              <li>SOLUTIONS</li>
              <li>COMPANY</li>
              <li>RESOURCES</li>
            </ul>
          </li>
          <li>
            <button className="Home-header--login-btn" onClick={() => handleClick('login')}>
              Log In
            </button>
            <button
              className="Home-header--login-btn btn-signup"
              onClick={() => handleClick('signup')}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </header>
      <section className="Home-image-container">
        <header>
          <div>Explore</div>
          <div>the new way</div>
          <div>of shipping packages</div>
        </header>
      </section>
    </div>
  )
}

export default Home
