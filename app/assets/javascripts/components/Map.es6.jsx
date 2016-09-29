class Map extends React.Component {
  constructor() {
    super()
    this.dashedStyle = [{
      icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            strokeWeight: 3,
            scale: 3
         },
      offset: '0',
      repeat: '20px'
    }]
    this.lineColors = {
      'RD': '#C90E0E',
      'BL': '#2B84E3',
      'GR': '#18A132',
      'SL': '#B6B5B1',
      'OR': '#D39A1D',
      'YL': '#E0ED26'
    }
    this.lineObjects = {}
    this.mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
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
        center: {lat: 39.000, lng: -77.000},
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        styles: this.mapStyles
      })

      google.maps.event.addListener(this.map, "click", () => this.props.clickInfoWindow(null, null))

      this.props.stations.forEach((station) => {
        this.markStation(station)
        this.drawLines(station)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.lines.forEach((line) => {
      if (nextProps.lineToggles[line.name]) {
        this.showLine(line.name)
      } else {
        this.hideLine(line.name)
      }
    })
    const status = nextProps.liveStatus.filter((x) => x)
    status.forEach((update) => {
      if (update.canceled === true) { this.hideLine(update.line) }
      else if (update.canceled) { this.removeClosedStations(update.line, update.canceled[0], update.canceled[1]) }
      else if (update.status === 'delays') { this.markDelays(update.line) }
    })
  }

  markDelays(line_name) {
    const dashedOptions = {
      strokeOpacity: 0,
      icons: this.dashedStyle
    }
    Object.keys(this.lines).forEach((station_pair) => this.lines[station_pair][line_name] ? this.lines[station_pair][line_name].setOptions(dashedOptions) : null)
  }

  findStationById(station_id) {
    return this.props.stations.find((station) => station.id === station_id)
  }

  findLineById(line_id) {
    return this.props.lines.find((line) => line.id === line_id)
  }

  getSegmentsBetween(station, other_station) {
    return this.lines[[station.mta_id, other_station.mta_id].sort().join('_')]
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
      this.drawLinesBetween(station, other_station)
    })
  }

  drawLinesBetween(station, other_station) {
    const name = [station.mta_id, other_station.mta_id].sort().join('_')
    if (this.lines[name]) Object.keys(this.lines[name]).forEach((line) => this.lines[name][line].setMap(null))
    const lines = this.getConnectingLines(station, other_station).sort((a,b) => a.line_id > b.line_id ? 1 : -1)
    const angle = Math.atan((station.lng - other_station.lng) / (other_station.lat - station.lat))
    const lat_offset = Math.sin(angle)
    const lng_offset = Math.cos(angle)
    this.lines[name] = lines.reduce((result,line, i) => {
      const factor = (i - (lines.length / 2)) / 10000
      const coords = [this.offsetStationPosition(station, lat_offset * factor, lng_offset * factor), this.offsetStationPosition(other_station, lat_offset * factor, lng_offset * factor)]
      path = this.drawLineSegment(coords, null, line)
      google.maps.event.addListener(path, "mouseover", () => this.props.lineHover(line.name))
      google.maps.event.addListener(path, "mouseout", () => this.props.lineHover(""))
      google.maps.event.addListener(path, "click", () => this.props.clickInfoWindow(line.name))
      path.setMap(this.map)
      result[line.name] = path
      return result
    }, {})
  }

  hideLine(line_name) {
    Object.keys(this.lines).forEach((station_pair) => this.lines[station_pair][line_name] ? this.lines[station_pair][line_name].setMap(null) : null)
  }

  showLine(line_name) {
    Object.keys(this.lines).forEach((station_pair) => this.lines[station_pair][line_name] ? this.lines[station_pair][line_name].setMap(this.map) : null)
  }

  removeClosedStations(line_name, first_station_name, last_station_name) {
    this.hideLine(line_name)
    const line = this.props.lines.find((l) => l.name === line_name)
    if (!line) return false
    const remove_from = line.stations.find((station) => first_station_name.match(station.name) || station.name.match(first_station_name.trim()))
    const remove_to = line.stations.find((station) => last_station_name.match(station.name) || station.name.match(last_station_name.trim()))
    if (!(remove_from && remove_to)) return false
    const big_order = this.getStationOrder(remove_from, line) > this.getStationOrder(remove_to, line) ? this.getStationOrder(remove_from, line) : this.getStationOrder(remove_to, line)
    const small_order = this.getStationOrder(remove_from, line) < this.getStationOrder(remove_to, line) ? this.getStationOrder(remove_from, line) : this.getStationOrder(remove_to, line)
    const filtered_line = this.sortStations(line).filter((station) => !(this.getStationOrder(station, line) >= small_order && this.getStationOrder(station, line) <= big_order) )
    filtered_line.forEach((station,i)=>{
      const other_station = filtered_line[i+1]
      if (other_station) {
        this.drawLinesBetween(station,other_station)
      }
    })
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
    return new google.maps.Polyline({
      path: pairOfLatLng,
      strokeColor: this.lineColors[line.name],
      strokeOpacity: (lineType === 'dashed') ? 0 : 1,
      //set strokeOpacity to 0 for dashed lines and 1 for solid
      strokeWeight: 4,
      icons: (lineType === 'dashed') ? this.dashedStyle : null,
      zIndex: 1
    })
  }

  markStation(station) {
    const google = this.props.google
    const circle = new google.maps.Circle({
      center: station,
      fillColor: 'white',
      fillOpacity: 1,
      strokeColor: 'white',
      radius: 25,
      zIndex: 2
    })
    google.maps.event.addListener(circle, "mouseover", () => this.props.stationHover(null, station))
    google.maps.event.addListener(circle, "mouseout", () => this.props.stationHover(null, ""))
    google.maps.event.addListener(circle, "click", () => this.props.clickInfoWindow(null, station))
    circle.setMap(this.map)
  }

  render() {
    return (
      <div className="panel panel-default" id="map-container" ref="map" style={this.props.mapStyle}>Mappy mcMapperface</div>
    )
  }
}
