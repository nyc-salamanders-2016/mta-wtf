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
      if (update.canceled === true) { this.lineObjects[update.line].forEach((segment) => segment.setMap(null)) }
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

  // getLineCoords(line) {
  //   const stations = this.sortStations(line)
  //   return stations.map((station) => {
  //     let newLng = station.lng + (line.id * 0.0001)
  //     let newLat = station.lat + (line.id * 0.0001)
  //     return {lat: newLat, lng: newLng}
  //   })
  // }

  stationHasMultipleLines(station){
    if (station.lines.count > 1) {
      return true
    }
  }

  dashedLinePath(line){
    let dashedLine = line.stations.filter(function(station){
      return stationHasMultipleLines(station)
    })
    return sortStations(dashedLine)
  }

  // drawDashedLine(line){
  //   const google = this.props.google
  //   const lineSymbol = {
  //       path: 'M 0,-1 0,1',
  //       strokeOpacity: 1,
  //       strokeWeight: 4,
  //       scale: 3
  //    };
  //   const path = new google.maps.Polyline({
  //     path: this.dashedLinePath(line),
  //     strokeColor: this.lineColors[line.name],
  //     strokeOpacity: 0,
  //     strokeWeight: 4,
  //     icons: [{
  //           icon: lineSymbol,
  //           offset: '0',
  //           repeat: '20px'
  //         }]
  //   })
  //   // console.log(path.getPath().b.map((point) => {return {lat: point.lat(), lng: point.lng()}}))
  //   google.maps.event.addListener(path, "mouseover", () => this.props.handleHover(line.name))
  //   path.setMap(this.map)
  //   this.lineObjects[line.name] = path
  // }

  stationPairs(line) {
    return this.sortStations(line).reduce((results, station, index, stations) => {
      if (index < stations.length - 1) {
        return results.concat([[station, stations[index+1]]])
      } else { return results }
    }, [])
  }

  pairShareLines(pair){
    if (pair[0].line_stations[0].line_id == pair[1].line_stations[0].line_id){
      return true
    }
  }

  drawLine(line) {
    const google = this.props.google
    this.stationPairs(line).forEach((pair)=> {
      const lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            strokeWeight: 4,
            scale: 3
         };
      const dashed = [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
        }]
        //if the first thing in a pair and the second thing share lines, make the line opaque and dashed
      const path = new google.maps.Polyline({
        path: pair,
        strokeColor: this.lineColors[line.name],
        strokeOpacity: this.pairShareLines(pair) ? 0 : 1,
        //set strokeOpacity to 0 for dashed lines and 1 for solid
        strokeWeight: 4,
        icons: this.pairShareLines(pair) ? dashed : null
      })
      // console.log(path.getPath().b.map((point) => {return {lat: point.lat(), lng: point.lng()}}))
      google.maps.event.addListener(path, "mouseover", () => this.props.lineHover(line.name))
      google.maps.event.addListener(path, "mouseout", () => this.props.lineHover(" "))
      path.setMap(this.map)
      // this.lineObjects[line.name] = path
      this.storeLineSegment(line, path)
    })
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
