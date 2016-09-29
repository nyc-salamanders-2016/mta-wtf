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
    this.clickInfoWindow = this.clickInfoWindow.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
  }

  componentDidMount() {
    this.refreshPage()

    this.props.lines.forEach((line)=> {
      this.state.lineToggles[line.name] = true
    })
  }

  refreshPage() {
    $.ajax({
      url: '/latest',
      method: 'get'
    }).done((response) => {
      this.setState({
        liveStatus: response
      })
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

  clickInfoWindow(line, station) {
    this.setState({
      clickWindowLine: line,
      clickWindowStation: station
    })
  }

  render() {
    liveStatus = this.state.liveStatus.filter( (x) => x )
    const mapStyle = {
      height: 900,
      border: '1px solid black'
    }
    return (
      <div className="container-fluid" id="wrapper">
        <div className="row">
          <div className='col-md-4' id="left-content">
            <NavBar className="row" />
            <KeyWindow className="row" liveStatus={liveStatus} refreshPage={this.refreshPage} />
            <FilterLineWindow className="row" toggleLineCheckbox={this.toggleLineCheckbox} lines={this.props.lines} lineToggles={this.state.lineToggles} />
            <InfoWindow className="row" liveStatus={liveStatus} lines={this.props.lines} showLine={this.state.infoWindowLine} showStation={this.state.infoWindowStation} defaultLine={this.state.clickWindowLine} defaultStation={this.state.clickWindowStation} />
          </div>
          <Map className='col-md-8' lineToggles={this.state.lineToggles} trackMouse={this.mouseCoords} liveStatus={liveStatus} lines={this.props.lines} stations={this.props.lines.reduce((ary,line) => {return ary.concat(line.stations)},[])} google={window.google} mapStyle={mapStyle}
               lineHover={this.setInfoWindow} stationHover={this.setInfoWindow} clickInfoWindow={this.clickInfoWindow} />
        </div>
      </div>
    )
  }
}
