class App extends React.Component {
  constructor() {
    super()
    this.state = {
      infoWindow: "key",
      liveStatus: []
    }

    this.setInfoWindowLine = this.setInfoWindowLine.bind(this)
    this.setInfoWindowStation = this.setInfoWindowStation.bind(this)
    this.mouseCoords = this.mouseCoords.bind(this)
  }

  componentDidMount() {
    $.ajax({
      url: '/latest',
      method: 'get'
    }).done((response) => {
      this.setState({
        liveStatus: response
      })
    })
  }

  setInfoWindowLine(line) {
    this.setState({
      infoWindowLine: line
    })
  }

  setInfoWindowStation(station) {
    this.setState({
      infoWindowStation: station
    })
  }

  mouseCoords(lat, lng) {
    this.setState({
      mouseLat: lat,
      mouseLng: lng
    })
  }

  render() {
    const mapStyle = {
      width: '60%',
      height: 700,
      border: '1px solid black'
    }
    return (
      <div id="wrapper">
        <div id="left-content">
        <FilterLine lines={this.props.lines}/>
        <InfoWindow mouseLat={this.state.mouseLat} mouseLng={this.state.mouseLng} lines={this.props.lines} showLine={this.state.infoWindowLine} />
        <StationWindow mouseLat={this.state.mouseLat} mouseLng={this.state.mouseLng} lines={this.props.lines} showStation={this.state.infoWindowStation} />
        </div>
        <Map trackMouse={this.mouseCoords} liveStatus={this.state.liveStatus} lines={this.props.lines} stations={this.props.stations} google={window.google} mapStyle={mapStyle} lineHover={this.setInfoWindowLine} stationHover={this.setInfoWindowStation} />
      </div>
    )
  }
}
