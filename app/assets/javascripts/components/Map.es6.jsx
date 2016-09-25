class Map extends React.Component {
  constructor() {
    super()

    this.lineColors = {
      1: '#EE352E',
      2: '#EE352E',
      3: '#EE352E',
      4: '#00933C',
      5: '#00933C',
      6: '#00933C'
    }
    this.lineObjects = {}
  }
  componentDidMount() {
    const google = this.props.google
    if (!this.map) {
      this.map = new google.maps.Map(this.refs.map, {
        center: {lat: 40.7048981, lng: -74.012385},
        zoom: 14
      })

      this.props.lines.forEach((line) => this.traceLine(line))
      this.props.stations.forEach((station) => this.markStation(station))
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.liveStatus.forEach((update) => {
      if (update.canceled === true) this.lineObjects[update.line].setMap(null)
    })
  }

  traceLine(line) {

    sorted_stations = line.stations.sort((a, b) => {
      if (a.order > b.order) {
        return 1
      } else if (b.order > a.order) {
        return -1
      }
      return 0
    })
    this.drawLine(line)
  }

  checkIfLineRunning(line) {
    debugger
    if (
      this.state.liveStatus &&
      this.state.liveStatus.find((message) => message.line === line.name) &&
      this.state.liveStatus.find((message) => message.line === line.name).canceled === true
    ) { return false } else { return true }
  }

  getPairOfCoordinates(stopa, stopb) {
    return [{ lat: stopa.lat, lng: stopa.lng },
    { lat: stopb.lat, lng: stopb.lng }]
  }

  drawLine(line) {
    const google = this.props.google

    const path = new google.maps.Polyline({
      path: line.stations,
      geodesic: true,
      strokeColor: this.lineColors[line.name],
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
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
      center: new google.maps.LatLng(station.lat, station.lng),
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
