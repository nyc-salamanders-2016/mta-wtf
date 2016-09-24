import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import stops from './stops'

const google = window.google

class App extends Component {
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: 40.7048981, lng: -74.012385},
      zoom: 14
    })

    const lines = this.getLines(stops)

    lines.forEach((coord_list) => this.drawLine(coord_list))
  }

  connectLatLng(stopa, stopb) {
    return [{ lat: stopa.stop_lat, lng: stopa.stop_lon },
    { lat: stopb.stop_lat, lng: stopb.stop_lon }]
  }

  getLines(stops) {
    return stops.filter((stop) => stop.line === 1)
         .reduce(
           (newArray, stop, index, array) => {
             if (!(index >= array.length - 2)) {
               newArray.push(this.connectLatLng(stop, array[index+1]))
             }
             return newArray
         }, [] )
  }

  drawLine(coord_list) {
    const path = new google.maps.Polyline({
      path: coord_list,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
    google.maps.event.addListener(path, "mouseover", () => console.log("I'm the 1 train!"))
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
