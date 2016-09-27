class App extends React.Component {
  constructor() {
    super()
    this.state = {
      infoWindow: "key",
      liveStatus: [],
      lineToggles: {}
    }

    this.setInfoWindow = this.setInfoWindow.bind(this)
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

  setInfoWindow(line, station) {
    this.setState({
      infoWindowLine: line,
      infoWindowStation: station
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
          <FilterLineWindow toggleLineCheckbox={this.toggleLineCheckbox} lines={this.props.lines} />
          <InfoWindow lines={this.props.lines} showLine={this.state.infoWindowLine} showStation={this.state.infoWindowStation} />
        </div>
        <Map lineToggles={this.state.lineToggles} trackMouse={this.mouseCoords} liveStatus={this.state.liveStatus} lines={this.props.lines} stations={this.props.lines.reduce((ary,line) => {return ary.concat(line.stations)},[])} google={window.google} mapStyle={mapStyle} lineHover={this.setInfoWindow} stationHover={this.setInfoWindow} />
      </div>
    )
  }
}
