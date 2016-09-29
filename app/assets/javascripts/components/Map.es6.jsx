class Map extends React.Component {
  constructor() {
    super()

    this.lineColors = {
      'RD': '#EE352E',
      'BL': '#EE352E',
      'GR': '#B933AD'
    }
    this.lineObjects = {}
    this.mapStyles = [
      {
        featureType: 'road',
        // elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'road.arterial',
        // elementType: 'labels',
        stylers: [
          { visibility: 'on' }
        ]
      },
      {
        featureType: 'poi',
        // elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'poi.park',
        // elementType: 'labels',
        stylers: [
          { visibility: 'on' }
        ]
      },
      {
        featureType: 'poi.business',
        // elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ]
    this.pairShareLines = this.pairShareLines.bind(this)
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
    const status = nextProps.liveStatus.filter((x) => x)
    status.forEach((update) => {
      if (update.canceled === true) { this.hideLine(update.line) }
      else if (update.canceled) { this.removeClosedStations(update.line, update.canceled[0], update.canceled[1]) }
    })
    nextProps.lines.forEach((line) => {
      if (nextProps.lineToggles[line.name]) {
        this.showLine(line.name)
      } else {
        this.hideLine(line.name)
      }
    })
  }

  hideLine(line_name) {
    this.lineObjects[line_name].forEach((segment) => segment.setMap(null))
  }

  showLine(line_name) {
    this.lineObjects[line_name].forEach((segment) => segment.setMap(this.map))
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
    this.lineObjects[line.name].forEach((segment) => segment.setPath(filtered_line) )
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

  // stationHasMultipleLines(station){
  //   if (station.line_stations.length > 1) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  stationHasMultipleLines(station){
    return station.line_stations.length > 1
  }

  stationPairs(line) {
    return this.sortStations(line).reduce((results, station, index, stations) => {
      if (index < stations.length - 1) {
        return results.concat([[station, stations[index+1]]])
      } else { return results }
    }, [])
    debugger
  }

  pairShareLines(pair){
    if (this.stationHasMultipleLines(pair[0]) && this.stationHasMultipleLines(pair[1]) && pair[0].line_stations[0].line_id === pair[1].line_stations[0].line_id){
      return true
    }
    return false
  }

  drawLine(line) {
    const google = this.props.google
    this.stationPairs(line).forEach((pair)=> {
      //if the first thing in a pair and the second thing share lines, make the line opaque and dashed
      lineType = this.pairShareLines(pair) ? 'dashed' : null
      var path = this.drawLineSegment(pair, lineType, line)

      google.maps.event.addListener(path, "mouseover", () => this.props.lineHover(line.name))
      google.maps.event.addListener(path, "mouseout", () => this.props.lineHover(" "))
      path.setMap(this.map)
      // this.lineObjects[line.name] = path
      this.storeLineSegment(line, path)
    })
  }
  drawLineSegment(pairOfLatLng, lineType, line) {
    const lineSymbol = {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          strokeWeight: 3,
          scale: 3
       };
    const dashed = [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
      }]
    return new google.maps.Polyline({
      path: pairOfLatLng,
      strokeColor: this.lineColors[line.name],
      strokeOpacity: (lineType === 'dashed') ? 0 : 1,
      //set strokeOpacity to 0 for dashed lines and 1 for solid
      strokeWeight: 4,
      icons: (lineType === 'dashed') ? dashed : null
    })
  }

  storeLineSegment(line, object) {
    this.lineObjects[line.name] = this.lineObjects[line.name] || []
    this.lineObjects[line.name].push(object)
  }

  markStation(station) {
    const google = this.props.google
    const circle = new google.maps.Marker({
      position: station,
      title: station.name,
      icon: {
        fillColor: '#FF0000',
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 2
      }
    })
    google.maps.event.addListener(circle, "mouseover", () => this.props.stationHover(station.name))
    google.maps.event.addListener(circle, "mouseout", () => this.props.stationHover(" "))
    circle.setMap(this.map)
  }

  render() {
    return (
      <div id="map-container" ref="map" style={this.props.mapStyle}>Mappy mcMapperface</div>
    )
  }
}
