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

  console.log(location.state)

  const loadParcels = async () => {
    const { data } = await axios.get(
      `http://localhost:2020/parcels/customers/${location.state._id}`
    )
    console.log(data.data.parcels)
    setParcels(data.data.parcels)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(`http://localhost:2020/parcels`, state)
      console.log(response)
      alert('AWESOME: PACKAGE JUST CREATED')
    } catch (error) {
      alert('ERROR: PACKAGE NOT CREATED')
    }
  }

  return (
    <div className="Dashboard">
      <header className="Dashboard__header">
        Welcome back {location.state.first_name.toUpperCase()}
      </header>
      <main className="Dashboard-container personal">
        <article className="Dashboard__user-info">
          <h3>My Data</h3>
          {Object.entries(location.state).map(entry => (
            <div key={entry[0]} className="Dashboard__user-info--fielContainer">
              <p className="Dashboard__user-info--fieldName">{entry[0]}</p>
              <p className="Dashboard__user-info--fieldValue">{entry[1]}</p>
            </div>
          ))}
        </article>
        <article className="Dashboard__user-info parcels">
          <h3 onClick={() => loadParcels()}>Load Parcels</h3>
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