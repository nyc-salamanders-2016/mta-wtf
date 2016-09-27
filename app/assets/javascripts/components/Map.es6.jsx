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
      L: '#A7A9AC',
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
    this.lines = {}
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

      this.props.lines.forEach((line) => this.drawLines(line.stations[0]))
      this.props.stations.forEach((station) => this.markStation(station))
    }
  }

  findStationById(station_id) {
    return this.props.stations.find((station) => station.id === station_id)
  }

  findLineById(line_id) {
    return this.props.lines.find((line) => line.id === line_id)
  }

  getConnectingLines(a,b) {
    return a.line_stations.filter((als)=>b.line_stations
                            .find((bls)=>bls.line_id === als.line_id))
                          .map((ls)=>this.findLineById(ls.line_id))
  }

  getStationConnections(station) {
    return station.line_stations.reduce((result, ls) => {
      if (ls.next_station_id) result.push(this.findStationById(ls.next_station_id))
      if (ls.prev_station_id) result.push(this.findStationById(ls.prev_station_id))
      return result
    }, [])
  }

  offsetStationPosition(station, lat_offset, lng_offset) {
    return {
      lat: station.lat + lat_offset,
      lng: station.lng + lng_offset
    }
  }

  drawLines(station) {
    station = station || this.props.stations[0]
    const connecting_stations = this.getStationConnections(station)
    connecting_stations.forEach((other_station)=> {
      const name = [station.mta_id, other_station.mta_id].sort().join('_')
      if (!this.lines[name]) {
        const lines = this.getConnectingLines(station, other_station).sort((a,b) => a.line_id > b.line_id ? 1 : -1)
        const angle = Math.atan((station.lng - other_station.lng) / (other_station.lat - station.lat))
        const lat_offset = Math.sin(angle)
        const lng_offset = Math.cos(angle)
        this.lines[name] = lines.map((line, i) => {
          const factor = (i - (lines.length / 2)) / 10000
          path = this.drawLineSegment([this.offsetStationPosition(station, lat_offset * factor, lng_offset * factor), this.offsetStationPosition(other_station, lat_offset * factor, lng_offset * factor)], null, line)
          path.setMap(this.map)
          return path
        })
        this.drawLines(other_station)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // const status = nextProps.liveStatus.filter((x) => x)
    // status.forEach((update) => {
    //   if (update.canceled === true) { this.hideLine(update.line) }
    //   else if (update.canceled) { this.removeClosedStations(update.line, update.canceled[0], update.canceled[1]) }
    // })
    // nextProps.lines.forEach((line) => {
    //   if (nextProps.lineToggles[line.name]) {
    //     this.showLine(line.name)
    //   } else {
    //     this.hideLine(line.name)
    //   }
    // })
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
