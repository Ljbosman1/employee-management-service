import React from 'react';
import './App.css';
import { Component } from "react";
import Home from "./pages/Home";

require('dotenv').config()

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Home/>
        </header>
    </div>
    );
  }
}


export default App;
