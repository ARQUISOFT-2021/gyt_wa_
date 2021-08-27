import React, { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload }
    case 'sender_id':
      return { ...state, sender_id: action.payload }
    case 'receiver_id':
      return { ...state, receiver_id: action.payload }
    case 'weight':
      return { ...state, weight: Number(action.payload) }
    case 'long':
      return { ...state, long: Number(action.payload) }
    case 'width':
      return { ...state, width: Number(action.payload) }
    case 'height':
      return { ...state, height: Number(action.payload) }
    default:
      return state
  }
}

const Dashboard = () => {
  const [parcels, setParcels] = useState([])
  const location = useLocation()
  const history = useHistory()

  const [state, dispatch] = useReducer(reducer, {
    name: '',
    sender_id: location.state._id,
    receiver_id: '',
    weight: 1,
    long: 1,
    width: 1,
    height: 1,
    is_fragile: true,
  })

  const { name, sender_id, receiver_id, weight, long, width, height } = state

  useEffect(() => {
    console.log(location.state)
    localStorage.setItem('_id', location.state._id)
    location.userType && localStorage.setItem('userType', location.userType)
    localStorage.setItem('token', location.state.token)
    // !localStorage.getItem('token') && history.push({ pathname: '/' })
  }, [location])

  // console.log(location.state)
  // localStorage.setItem('_id', location.state._id)
  // location.userType && localStorage.setItem('userType', location.userType)
  // localStorage.setItem('token', location.state.token)
  // console.log('LOCAL ISSSS', localStorage.getItem('customer'))
  // delete location.state['password']
  // delete location.state['__v']

  const loadParcels = async () => {
    const { data } = await axios.get(
      `http://172.17.0.6:2020/parcels/customers/${localStorage.getItem('_id')}`
    )
    console.log(data.data.parcels)
    setParcels(data.data.parcels)
  }

  const handleDeleteParcel = async id => {
    try {
      await axios.delete(`http://172.17.0.6:2020/parcels/${id}`)
      alert('Parcel Succesfully Deleted')
      loadParcels()
    } catch (error) {
      alert('ERROR: PARCEL NOT DELETED')
    }
  }

  const handleDeleteUser = async id => {
    try {
      await axios.delete(`http://172.17.0.6:2020/${localStorage.getItem('userType')}s/${id}`)
      alert('USER SUCCESFULLY DELETED')
      console.log('USER ID', id)
      localStorage.clear()
      history.push({
        // pathname: `${state.userType}s/dashboard`,
        // state: response.data.data.customer,
        pathname: '/',
        // state: { userType, id: response.data.id },
      })
    } catch (error) {
      alert('ERROR: USER NOT DELETED')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(`http://172.17.0.6:2020/parcels`, state)
      console.log(response)
      alert('AWESOME: PARCEL JUST CREATED')
      loadParcels()
    } catch (error) {
      alert('ERROR: PARCEL NOT CREATED')
    }
  }

  const handlePremium = async () => {
    try {
      const { data } = await axios.post(
        `http://172.17.0.6:2020/${localStorage.getItem('userType')}s/premium`,
        {
          token: localStorage.getItem('token'),
        }
      )
      // alert('USER SUCCESFULLY DELETED')
      console.log(data)
      // alert(data.message)
      if (data.message === 'PREMIUM') {
        history.push({
          // pathname: `${state.userType}s/dashboard`,
          // state: response.data.data.customer,
          pathname: `/${localStorage.getItem('userType')}s/premium`,
          // state: { userType, id: response.data.id },
        })
      } else {
        alert('ERROR: INVALID/EXPIRED TOKEN')
      }
    } catch (error) {
      alert('ERROR: INVALID/EXPIRED TOKEN')
    }
  }

  const goHome = () => {
    history.push({
      // pathname: `${state.userType}s/dashboard`,
      // state: response.data.data.customer,
      pathname: '/',
      // state: { userType, id: response.data.id },
    })
  }

  return (
    <div className="Dashboard">
      <button className="btn-premium left" onClick={() => goHome()}>
        LOG OUT
      </button>
      <header className="Dashboard__header">
        Welcome back {location.state.first_name.toUpperCase()}
        <button className="btn-premium" onClick={() => handlePremium()}>
          TRY PREMIUM (ONLY USERS)
        </button>
      </header>
      <main className="Dashboard-container personal">
        <article className="Dashboard__user-info">
          <h3>My Data</h3>
          {Object.entries(location.state).map(entry => entry[0]!=="token" && entry[0]!=="password" && entry[0]!=="__v"?(
            <div key={entry[0]} className="Dashboard__user-info--fielContainer">
              <p className="Dashboard__user-info--fieldName">{entry[0]}</p>
              <p className="Dashboard__user-info--fieldValue">{entry[1]}</p>
            </div>
          ):"")}
          <button className="btn btn-delete" onClick={() => handleDeleteUser(location.state._id)}>
            DELETE ME
          </button>
        </article>
        <article className="Dashboard__user-info parcels">
          <h3 onClick={() => loadParcels()}>Load My Parcels</h3>
          {parcels.map(parcel => (
            <div
              key={parcel._id}
              style={{ borderBottom: '2px solid #6741d9', paddingBottom: '10px' }}
            >
              {Object.entries(parcel).map(entry => (
                <div key={entry[0]} className="Dashboard__user-info--fielContainer">
                  <p className="Dashboard__user-info--fieldName">{entry[0]}</p>
                  <p className="Dashboard__user-info--fieldValue">{String(entry[1])}</p>
                </div>
              ))}
              <button className="btn btn-delete" onClick={() => handleDeleteParcel(parcel._id)}>
                DELETE PARCEL
              </button>
            </div>
          ))}
        </article>
        <article className="Dashboard__user-info Parcel-form-container ">
          <h3 onClick={() => loadParcels()}>New Parcel</h3>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              <label className="field">PACKAGE NAME</label>
              <input
                required
                className="field"
                type="text"
                value={name}
                onChange={e =>
                  dispatch({
                    type: 'name',
                    payload: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="field">SENDER_ID (YOU)</label>
              <input
                required
                className="field"
                type="text"
                value={sender_id}
                onChange={e =>
                  dispatch({
                    type: 'sender_id',
                    payload: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="field">RECEIVER_ID</label>
              <input
                required
                className="field"
                type="text"
                value={receiver_id}
                onChange={e =>
                  dispatch({
                    type: 'receiver_id',
                    payload: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="field">WEIGHT</label>
              <input
                required
                className="field"
                type="number"
                value={weight}
                onChange={e =>
                  dispatch({
                    type: 'weight',
                    payload: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="field">LONG</label>
              <input
                required
                className="field"
                type="number"
                value={long}
                onChange={e =>
                  dispatch({
                    type: 'long',
                    payload: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="field">WIDTH</label>
              <input
                required
                className="field"
                type="number"
                value={width}
                onChange={e =>
                  dispatch({
                    type: 'width',
                    payload: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="field">HEIGHT</label>
              <input
                required
                className="field"
                type="number"
                value={height}
                onChange={e =>
                  dispatch({
                    type: 'height',
                    payload: e.target.value,
                  })
                }
              ></input>
            </div>
            <button>CREATE PARCEL</button>
          </form>
        </article>
      </main>
    </div>
  )
}

export default Dashboard
