import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
