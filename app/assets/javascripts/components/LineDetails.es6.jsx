class LineDetails extends React.Component{

  stationNames() {
    return this.props.line.stations.map((station, i) => <li key={i}>{station.name}</li>)
  }

  render(){
    return(
      <div>
      <p>This is the {this.props.showLine} train.</p>
      <ul>{this.stationNames()}</ul>
      </div>
    )
  }
}
