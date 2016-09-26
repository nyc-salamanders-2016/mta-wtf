class App extends React.Component {
  constructor() {
    super()
    this.state = {
      infoWindow: "key",
      liveStatus: [],
      lineToggle: {}
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
    // lineToggle = {
    //   for (i=0; i < this.props.lines.length; i++) {
    //     this.props.lines[i] checkbox: true
    //   }
    // }



    // lineToggle = {
    //   this.props.lines.forEach((line) => {
    //     checkBox: true
    //   })
    // }
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

  // checkedBox(select) {
  //   this.setState({
  //   lineToggle = {
  //     this.props.lines.forEach((line) => {
  //       if (checkbox === true) {
  //         checkbox = false
  //       } else
  //       {checkbox = true}
  //     })
  //   })
  // }

  render() {
    const mapStyle = {
      width: '60%',
      height: 700,
      border: '1px solid black'
    }
    return (
      <div id="wrapper">
        <div id="left-content">
        <FilterLine checkBoxIndicator={this.checkedBox} lines={this.props.lines}/>
        <InfoWindow mouseLat={this.state.mouseLat} mouseLng={this.state.mouseLng} lines={this.props.lines} showLine={this.state.infoWindowLine} />
        <StationWindow mouseLat={this.state.mouseLat} mouseLng={this.state.mouseLng} lines={this.props.lines} showStation={this.state.infoWindowStation} />
        </div>
        <Map trackMouse={this.mouseCoords} liveStatus={this.state.liveStatus} lines={this.props.lines} stations={this.props.stations} google={window.google} mapStyle={mapStyle} lineHover={this.setInfoWindowLine} stationHover={this.setInfoWindowStation} />
      </div>
    )
  }
}
