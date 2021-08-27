import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import GMaps from './views/GMaps'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/customers/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/couriers/dashboard">

        <h1
          style={{
            //marginTop: '40vh',
            fontSize: '60px',
            textAlign: 'center',
              height: '12vh',
            backgroundColor: '#000',
            color: '#fff',
          }}
        >
          SUCCESSFULLY LOGGED IN. WE'LL BE BACK SOON
        </h1>
          {<GMaps /> }
      </Route>
      <Route exact path="/customers/premium">
        <h1
          style={{
            marginTop: '40vh',
            fontSize: '60px',
            textAlign: 'center',
            backgroundColor: '#000',
            color: '#fff',
          }}
        >
          PREMIUM
        </h1>
      </Route>
    </Switch>
  )
}

export default App
