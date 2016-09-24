import React, { Component } from 'react'
import stops from './stops'

import Route from './Route'

class Map extends Component {
  constructor() {
    super()
    this.state={}
  }
  componentDidMount() {
    const google = this.props.google
    this.setState({
      map: new google.maps.Map(this.refs.map, {
          center: {lat: 40.7048981, lng: -74.012385},
          zoom: 14
        })
      })
    this.props.setMap(this.state.map)
  }

  render() {
    return (
      <div>
        <div ref="map" style={this.props.mapStyle}/>
        Mappy mcMapperface
        <Route map={this.state.map} google={this.props.google} stations={stops} />
      </div>
    )
  }
}

export default Map;
