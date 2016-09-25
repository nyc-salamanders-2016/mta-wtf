class Map extends React.Component {
  constructor() {
    super()

    this.lineColors = {
      1: '#EE352E',
      2: '#EE352E',
      3: '#EE352E',
      4: '#00933C',
      5: '#00933C',
      6: '#00933C',
      '6E': '#00933C',
      A: '#0039A6',
      C: '#0039A6',
      E: '#0039A6',
      B: '#FF6319',
      D: '#FF6319',
      F: '#FF6319',
      M: '#FF6319',
      G: '#6CBE45',
      J: '#996633',
      Z: '#996633',
      J: '#A7A9AC',
      N: '#FCCC0A',
      Q: '#FCCC0A',
      R: '#FCCC0A',
      S: '#808183',
      7: '#B933AD',
      '7E': '#B933AD'
    }
    this.lineObjects = {}
    this.mapStyles = [
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'poi',
        // elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ]
  }

  componentDidMount() {
    const google = this.props.google
    // Interesting map options:
    // mapTypeId: "hybrid"
    if (!this.map) {
      this.map = new google.maps.Map(this.refs.map, {
        center: {lat: 40.745, lng: -73.897},
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        styles: this.mapStyles
      })
      google.maps.event.addListener(this.map, 'mousemove', (event) => this.props.trackMouse(event.latLng.lat(), event.latLng.lng()))

      this.props.lines.forEach((line) => this.drawLine(line))
      this.props.stations.forEach((station) => this.markStation(station))
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.liveStatus.forEach((update) => {
      if (update.canceled === true) { this.lineObjects[update.line].setMap(null) }
      else { this.removeClosedStations(update.line, update.canceled[0], update.canceled[1]) }
    })
  }

  removeClosedStations(line_name, first_station_name, last_station_name) {
    const line = this.props.lines.find((l) => l.name === line_name)
    if (!line) return false
    const remove_from = line.stations.find((station) => first_station_name.match(station.name) || station.name.match(first_station_name.trim()))
    const remove_to = line.stations.find((station) => last_station_name.match(station.name) || station.name.match(last_station_name.trim()))
    if (!(remove_from && remove_to)) return false
    const big_order = this.getStationOrder(remove_from, line) > this.getStationOrder(remove_to, line) ? this.getStationOrder(remove_from, line) : this.getStationOrder(remove_to, line)
    const small_order = this.getStationOrder(remove_from, line) < this.getStationOrder(remove_to, line) ? this.getStationOrder(remove_from, line) : this.getStationOrder(remove_to, line)
    const filtered_line = this.sortStations(line).filter((station) => !(this.getStationOrder(station, line) >= small_order && this.getStationOrder(station, line) <= big_order) )
    this.lineObjects[line.name].setPath(filtered_line)
  }


  getStationOrder(station, line) {
    return station.line_stations.find((ls) => ls.line_id === line.id).order
  }

  sortStations(line) {
    return line.stations.sort((a, b) => {
      if (this.getStationOrder(a, line) > this.getStationOrder(b, line)) {
        return 1
      } else if (this.getStationOrder(b, line) > this.getStationOrder(a, line)) {
        return -1
      }
      return 0
    })
  }

  // getLineCoords(line) {
  //   const stations = this.sortStations(line)
  //   return stations.map((station) => {
  //     let newLng = station.lng + (line.id * 0.0001)
  //     let newLat = station.lat + (line.id * 0.0001)
  //     return {lat: newLat, lng: newLng}
  //   })
  // }

  drawLine(line) {
    const google = this.props.google
    const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        strokeWeight: 4,
        scale: 3
     };
    // const coords = line.stations.map((station) => new google.maps.LatLng(station.lat, station.lng))
    const path = new google.maps.Polyline({
      path: this.sortStations(line),
      strokeColor: this.lineColors[line.name],
      strokeOpacity: 0,
      //set strokeOpacity to 0 for dashed lines and 1 for solid
      strokeWeight: 4,
      icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }]
    })
    // console.log(path.getPath().b.map((point) => {return {lat: point.lat(), lng: point.lng()}}))
    google.maps.event.addListener(path, "mouseover", () => this.props.handleHover(line.name))
    path.setMap(this.map)
    this.lineObjects[line.name] = path
  }

  storeLineSegment(line, object) {
    this.lineObjects[line.name] = this.lineObjects[line.name] || []
    this.lineObjects[line.name].push(object)
  }

  markStation(station) {
    const google = this.props.google
    const circle = new google.maps.Circle({
      center: station,
      radius: 10,
      fillColor: '#FF0000'
    })
    circle.setMap(this.map)
  }

  render() {
    return (
      <div id="map-container" ref="map" style={this.props.mapStyle}>Mappy mcMapperface</div>
    )
  }
}
