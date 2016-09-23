import React, { Component } from 'react';
import logo from './logo.svg';
// import Map, {InfoWindow, Marker} from 'google-maps-react'
import GMap from './GMap'
import './App.css';


class App extends Component {
  componentDidMount() {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: {lat: 40.7048981, lng: -74.012385},
      zoom: 14
    })

    // this.map.data.loadGeoJson('data.js')
    this.renderFlights();
  }

  renderFlights(){
    var flightPlanCoordinates = [
    {lat: 40.706, lng: -74.009},
    {lat: 40.703, lng: -74.012}
    ];

    var flightPath = new window.google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
    })

    flightPath.setMap(this.map)
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: 500,
      border: '1px solid black'
    }

    return (
      <div className="App">
        <code><pre>{JSON.stringify(this.props)}</pre></code>
        <div ref="map" style={mapStyle}>Mappy mcMapperface</div>
      </div>
    )
  }
}

export default App;
