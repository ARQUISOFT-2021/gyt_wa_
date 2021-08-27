import React, { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'username':
      return { ...state, username: action.payload }
    case 'password':
      return { ...state, password: action.payload }
    case 'userType':
      return { ...state, userType: action.payload }
    default:
      return state
  }
}

const Login = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
    userType: 'customer',
  })
  const { username, password } = state

  const handleSubmit = async e => {
    // console.log(userType)
    e.preventDefault()
    // alert(state.userType)
    console.log(state)
    try {
      const response = await axios.post(`http://172.17.0.6:2020/${state.userType}s/login`, {
        username: state.username,
        password: state.password,
      })
      // console.log('LOGIN SUCCESSFUL', response.data.data.customer)
      if (response.data.data.customer)
        history.push({
          pathname: `${state.userType}s/dashboard`,
          state: response.data.data.customer,
          userType: state.userType,
          // state: { userType, id: response.data.id },
        })
      else throw new Error('Required')
      console.log(state)
    } catch (error) {
      console.log('SE FUE POR ACA')
      alert('INVALID CREDENTIALS')
    }
  }

  return (
    <div className="Login">
      <section className="Login-photos-container">
        <img
          className="photo-1"
          alt="demo"
          src="https://images.unsplash.com/photo-1600494573555-a5ead7b7ee23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ></img>
        <img
          className="photo-2"
          alt="demo"
          src="https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
        ></img>
        <img
          className="photo-3"
          alt="demo"
          src="https://images.unsplash.com/photo-1604506522146-316c8bedd874?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80"
        ></img>
      </section>
      <div className="Login-form-container">
        <form onSubmit={e => handleSubmit(e)}>
          <h2>Goods & Transport</h2>
          <div>
            <label className="field">username</label>
            <input
              className="field"
              type="text"
              value={username}
              onChange={e =>
                dispatch({
                  type: 'username',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <label className="field">password</label>
            <input
              className="field"
              type="password"
              value={password}
              onChange={e =>
                dispatch({
                  type: 'password',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="radio-btn">
            <input
              type="radio"
              value="customer"
              checked={state.userType === 'customer'}
              onChange={e =>
                dispatch({
                  type: 'userType',
                  payload: e.target.value,
                })
              }
            ></input>
            <label>customer</label>
          </div>
          <div className="radio-btn">
            <input
              type="radio"
              value="courier"
              checked={state.userType === 'courier'}
              onChange={e =>
                dispatch({
                  type: 'userType',
                  payload: e.target.value,
                })
              }
            ></input>
            <label>courier</label>
          </div>
          <button>LOG IN</button>
        </form>
      </div>
    </div>
  )
}

export default Login
