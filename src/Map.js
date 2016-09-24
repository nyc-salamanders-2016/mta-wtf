import React, { Component } from 'react'
import stops from './stops'

class Map extends Component {
  constructor() {
    super()

    this.drawLine = this.drawLine.bind(this)
  }
  componentDidMount() {
    const google = this.props.google
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
    const google = this.props.google
    const path = new google.maps.Polyline({
      path: coord_list,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
    google.maps.event.addListener(path, "mouseover", () => this.props.onHover() )
    path.setMap(this.map)
  }

  render = () => <div ref="map" style={this.props.mapStyle}>Mappy mcMapperface</div>
}

export default Map;
