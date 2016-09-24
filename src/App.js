import React, { Component } from 'react'
import './App.css'

import Map from './Map'

class App extends Component {
  constructor() {
    super()
    this.onHover = this.onHover.bind(this)
  }
  myName = "Josh"
  onHover() {
    console.log("I'm the one train", this.myName)
    this.myName = "Elisa"
    console.log(this.myName)
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: 700,
      border: '1px solid black'
    }
    return (
      <div className="App">
        <Map onHover={this.onHover} google={window.google} mapStyle={mapStyle} />
      </div>
    )
  }
}

export default App
