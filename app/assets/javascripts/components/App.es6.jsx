class App extends React.Component {
  constructor() {
    super()
    this.state = {
      infoWindow: "key",
      liveStatus: []
    }

    this.switchInfoWindowInformation = this.switchInfoWindowInformation.bind(this)
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

  switchInfoWindowInformation(line) {
    this.setState({
      infoWindow: line
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
      <div className="App">
        <InfoWindow mouseLat={this.state.mouseLat} mouseLng={this.state.mouseLng} lines={this.props.lines} showNow={this.state.infoWindow} />
        <Map trackMouse={this.mouseCoords} liveStatus={this.state.liveStatus} lines={this.props.lines} stations={this.props.stations} google={window.google} mapStyle={mapStyle} handleHover={this.switchInfoWindowInformation} />
      </div>
    )
  }
}
