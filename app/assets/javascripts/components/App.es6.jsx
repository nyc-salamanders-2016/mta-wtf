class App extends React.Component {
  constructor() {
    super()
    this.state = {
      infoWindow: "key",
      liveStatus: [],
      lineToggles: {}
    }

    this.setInfoWindowLine = this.setInfoWindowLine.bind(this)
    this.setInfoWindowStation = this.setInfoWindowStation.bind(this)
    this.mouseCoords = this.mouseCoords.bind(this)
    this.toggleLineCheckbox = this.toggleLineCheckbox.bind(this)
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

    this.props.lines.forEach((line)=> {
      this.state.lineToggles[line.name] = true
    })
  }

  toggleLineCheckbox(line_name, bool) {
    toggle = { [line_name]: bool }
    old_setting = this.state.lineToggles
    new_setting = Object.assign(old_setting, toggle)
    this.setState(({lineToggles: new_setting}))
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
      width: '67%',
      height: 770,
      border: '1px solid black'
    }
    return (
      <div id="wrapper">
        <div id="left-content">
        <KeyWindow />
        <FilterLine toggleLineCheckbox={this.toggleLineCheckbox} lines={this.props.lines}/>
        <InfoWindow mouseLat={this.state.mouseLat} mouseLng={this.state.mouseLng} lines={this.props.lines} showLine={this.state.infoWindowLine} />
        </div>
        <Map lineToggles={this.state.lineToggles} trackMouse={this.mouseCoords} liveStatus={this.state.liveStatus} lines={this.props.lines} stations={this.props.stations} google={window.google} mapStyle={mapStyle} lineHover={this.setInfoWindowLine} stationHover={this.setInfoWindowStation} />
      </div>
    )
  }
}
