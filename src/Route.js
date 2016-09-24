import React, { Component } from 'react'

class Route extends Component {
  componentDidMount() {
    // const google = this.props.google
    const lines = this.getLines(this.props.stations)
    lines.forEach((coord_list) => this.drawLine(coord_list))
  }

  connectLatLng(stopa, stopb) {
    return [{ lat: stopa.stop_lat, lng: stopa.stop_lon },
    { lat: stopb.stop_lat, lng: stopb.stop_lon }]
  }

  getLines(stops) {
    return stops.reduce(
           (newArray, stop, index, array) => {
             if (!(index >= array.length - 2)) {
               newArray.push(this.connectLatLng(stop, array[index+1]))
             }
             return newArray
         }, [] )
  }

  drawLine(coord_list) {
    const google = this.props.google
    const path = new google.maps.Polyline({
      path: coord_list,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
    google.maps.event.addListener(path, "mouseover", () => console.log("I'm the 1 train!"))
    path.setMap(this.props.map)
  }
  render = () => <div/>
}

export default Route
