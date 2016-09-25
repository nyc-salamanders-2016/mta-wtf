import React, { Component } from 'react'
import './App.css'
import InfoWindow from './InfoWindow'
import Map from './Map'

class App extends Component {
  constructor() {
    super()
    this.state = {
      infoWindow: "key"
    }

    this.switchInfoWindowInformation = this.switchInfoWindowInformation.bind(this)
  }

  switchInfoWindowInformation(line) {
    this.setState({
      infoWindow: line
    })
  }

  render() {
    const mapStyle = {
      width: '80%',
      height: 700,
      border: '1px solid black'
    }
    return (
      <div className="App">
        <InfoWindow showNow={this.state.infoWindow} />
        <Map google={window.google} mapStyle={mapStyle} handleHover={this.switchInfoWindowInformation} />
      </div>
    )
  }
}

export default App
