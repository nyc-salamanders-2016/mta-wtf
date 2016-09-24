import React, { Component } from 'react'
import './App.css'

import Map from './Map'

class App extends Component {
  setMap(map) {
    console.log(map)
    this.map = map
    console.log(this.map)
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: 700,
      border: '1px solid black'
    }
    return (
      <div className="App">
        <Map google={window.google} mapStyle={mapStyle} setMap={this.setMap} />
      </div>
    )
  }
}

export default App
