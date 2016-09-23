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

    const lines = [
      [
        {lat: 40.706, lng: -74.009},
        {lat: 40.702, lng: -74.009}
      ],
      [
        {lat: 40.704, lng: -74.009},
        {lat: 40.704, lng: -74.011}
      ],
      [
        {lat: 40.702, lng: -74.011},
        {lat: 40.706, lng: -74.011}
      ]
    ]

    lines.forEach((coord_list) => this.drawLine(coord_list))
  }

  renderFlights(){
    var flightPlanCoordinates = [
    {lat: 40.706, lng: -74.009},
    {lat: 40.703, lng: -74.009}
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

  drawLine(coord_list) {
    console.log(coord_list)
    const path = new window.google.maps.Polyline({
      path: coord_list,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
    path.setMap(this.map)
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
