import React, { Component } from 'react';
import logo from './logo.svg';
import Map, {InfoWindow, Marker} from 'google-maps-react'
import './App.css';


class App extends Component {
  onMarkerClick = (mapProps, map, clickEvent) => {
    console.log(mapProps)
    console.log(map)
    console.log(clickEvent)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <code><pre>{JSON.stringify(this.props)}</pre></code>
        <Map google={window.google} initialCenter={{lat: 40.705, lng: -74.011}} zoom={14}/>
      </div>
    );
  }
}

export default App;
