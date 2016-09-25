class App extends React.Component {
  constructor() {
    super()
    this.state = {
      infoWindow: "key",
      liveStatus: []
    }

    this.switchInfoWindowInformation = this.switchInfoWindowInformation.bind(this)
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

  render() {
    const mapStyle = {
      width: '80%',
      height: 700,
      border: '1px solid black'
    }
    return (
      <div className="App">
        <InfoWindow lines={this.props.lines} showNow={this.state.infoWindow} />
        <Map liveStatus={this.state.liveStatus} lines={this.props.lines} stations={this.props.stations} google={window.google} mapStyle={mapStyle} handleHover={this.switchInfoWindowInformation} />
      </div>
    )
  }
}
