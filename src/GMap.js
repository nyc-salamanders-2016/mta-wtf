import React, { Component } from 'react';

class GMap extends Component {
  componentDidMount() {
  this.map = new this.props.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34, lng: 150},
      zoom: 8
    })
  }

  render() {
    return (
      <div>
        {this.map}
      </div>
    )
  }
}

export default GMap
