import React, { Component } from 'react'
import './App.css'

import Map from './Map'

class App extends Component {
  render() {
    const mapStyle = {
      width: '100%',
      height: 700,
      border: '1px solid black'
    }
    return (
      <div className="App">
        <Map google={window.google} mapStyle={mapStyle} />
      </div>
    )
  }
}

export default App
