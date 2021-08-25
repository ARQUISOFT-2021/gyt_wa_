import React, { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'username':
      return { ...state, username: action.payload }
    case 'first_name':
      return { ...state, first_name: action.payload }
    case 'last_name':
      return { ...state, last_name: action.payload }
    case 'email':
      return { ...state, email: action.payload }
    case 'phone':
      return { ...state, phone: action.payload }
    case 'home_address':
      return { ...state, home_address: action.payload }
    case 'work_address':
      return { ...state, work_address: action.payload }
    case 'password':
      return { ...state, password: action.payload }
    default:
      return state
  }
}

const Signup = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    home_address: '',
    work_address: '',
    password: '',
    userType: 'customer',
  })
  const { username, first_name, last_name, email, phone, home_address, work_address, password } =
    state

  const handleSubmit = async e => {
    // console.log(userType)
    e.preventDefault()
    try {
      const requestBody = { ...state }
      delete requestBody.userType

      const response = await axios.post(`http://localhost:2020/${state.userType}s`, requestBody)
      // console.log('LOGIN SUCCESSFUL', response.data.data.customer)
      if (response.data.data.customer)
        history.push({
          pathname: `${state.userType}s/dashboard`,
          state: response.data.data.customer,
          userType: state.userType,
          // state: { userType, id: response.data.id },
        })
      else throw new Error('Required')
      console.log(requestBody)
    } catch (error) {
      alert('INVALID CREDENTIALS')
    }
  }

  return (
    <div className="Signup">
      <section className="Signup-photos-container">
        <img
          className="photo-1"
          alt="demo"
          src="https://images.unsplash.com/photo-1592946879272-bc79c290b1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80"
        ></img>
        <img
          className="photo-2"
          alt="demo"
          src="https://images.unsplash.com/photo-1561702469-c4239ced3f47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1189&q=80"
        ></img>
        <img
          className="photo-3"
          alt="demo"
          src="https://images.unsplash.com/photo-1595587637401-83ff822bd63e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1077&q=80"
        ></img>
      </section>
      <div className="Signup-form-container">
        <form onSubmit={e => handleSubmit(e)}>
          <h2>Goods & Transport</h2>
          <div className="Signup-choice">
            <button>Customer</button>
            <button className="disabled">Courier</button>
          </div>
          <div>
            <label className="field">username</label>
            <input
              required
              placeholder="Example: daneelfx"
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
            <label className="field">first name</label>
            <input
              required
              placeholder="Example: Daniel Felipe"
              className="field"
              type="text"
              value={first_name}
              onChange={e =>
                dispatch({
                  type: 'first_name',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <label className="field">last name</label>
            <input
              required
              placeholder="Example: Solano León"
              className="field"
              type="text"
              value={last_name}
              onChange={e =>
                dispatch({
                  type: 'last_name',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <label className="field">email</label>
            <input
              required
              placeholder="Example: dfsolanol@unal.edu.co"
              className="field"
              type="email"
              value={email}
              onChange={e =>
                dispatch({
                  type: 'email',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <label className="field">phone</label>
            <input
              required
              placeholder="Example: 3192031658"
              className="field"
              type="text"
              value={phone}
              onChange={e =>
                dispatch({
                  type: 'phone',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <label className="field">home address</label>
            <input
              required
              placeholder="Example: 4.696809, -74.080171"
              className="field"
              type="text"
              value={home_address}
              onChange={e =>
                dispatch({
                  type: 'home_address',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <label className="field">work address</label>
            <input
              required
              placeholder="Example: 4.696809, -74.080171"
              className="field"
              type="text"
              value={work_address}
              onChange={e =>
                dispatch({
                  type: 'work_address',
                  payload: e.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <label className="field">password</label>
            <input
              required
              placeholder="Your Password"
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
          <button>SIGN UP</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
