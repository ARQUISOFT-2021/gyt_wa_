import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'

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
    </Switch>
  )
}

export default App
