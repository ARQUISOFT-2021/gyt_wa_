import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'

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
        <Dashboard />
      </Route>
    </Switch>
  )
}

export default App
