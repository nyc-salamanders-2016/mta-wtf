class InfoWindow extends React.Component {

  render(){
    return(
      <div className="panel panel-default" id="info-container" >
      <div className="panel-body">
        { this.props.showStation ? <StationDetails showStation={this.props.showStation} lines={this.props.lines} /> :  this.props.showLine ? <LineDetails showLine={this.props.showLine} lines={this.props.lines} /> : <p>Please hover over a line or station for current service status.</p> }
      </div>
      </div>
    )
  }
}
