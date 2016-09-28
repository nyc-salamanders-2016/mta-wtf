class InfoWindow extends React.Component {

  getActiveLine() {
    return this.props.lines.find((line) => line.name === this.props.showLine)
  }
  
  render(){
    var line = this.props.lines.find((line) => line.name === this.props.showLine)
    return (
      <div className="panel panel-default" id="info-container" >
        <div className="panel-body">
          { this.props.showStation ? <StationDetails showStation={this.props.showStation} lines={this.props.lines} /> :  this.props.showLine ? <LineDetails line={this.getActiveLine()} /> : <p>Please hover over a line or station for current service status.</p> }
        </div>
      </div>
    )
  }
}
