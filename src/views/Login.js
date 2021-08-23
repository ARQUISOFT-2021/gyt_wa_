import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className="Login">
      <section className="Login-photos-container">
        <img
          class="photo-1"
          alt="demo"
          src="https://images.unsplash.com/photo-1600494573555-a5ead7b7ee23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ></img>
        <img
          class="photo-2"
          alt="demo"
          src="https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
        ></img>
        <img
          class="photo-3"
          alt="demo"
          src="https://images.unsplash.com/photo-1604506522146-316c8bedd874?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80"
        ></img>
      </section>
      <div className="Login-form-container">
        <form onSubmit={() => console.log('Holi')}>
          <h2>Goods & Transport</h2>
          <div>
            <label className="field">username</label>
            <input className="field" type="text"></input>
          </div>
          <div>
            <label className="field">password</label>
            <input className="field" type="password"></input>
          </div>
          <div className="radio-btn">
            <input type="radio"></input>
            <label>user</label>
          </div>
          <div className="radio-btn">
            <input type="radio"></input>
            <label>provider</label>
          </div>
          <button>LOG IN</button>
        </form>
      </div>
    </div>
  )
}

export default Login
