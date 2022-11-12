import React from 'react';
import './App.css';
import { Component, Fragment } from "react";
import Home from "./pages/Home";

require('dotenv').config()

class App extends Component {
  render() {
    return (
      <Fragment>
        <Home />
      </Fragment>
    );
  }
}


export default App;
