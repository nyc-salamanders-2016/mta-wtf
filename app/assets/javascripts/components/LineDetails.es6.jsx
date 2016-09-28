class LineDetails extends React.Component{
  isDuplicate(object, other_object) {
    return Object.keys(object).all((key)=> object[key] === other_object[key])
  }

  relevantDelays() {
    // const relevant = this.props.liveStatus.filter((update) => update.line === this.props.line.name)
    const update = this.props.liveStatus.find((update)=> update.line === this.props.line.name && update.status === "delays")
    return update ? `This line is experiencing delays going ${update.direction === "both" ? "both ways" : update.direction} because of ${update.reason} at ${update.reason_station}` : null
  }

  stationNames() {
    return this.props.line.stations.map((station, i) => <li key={i}>{station.name}</li>)
  }

  render(){
    return(
      <div>
      <p>This is the {this.props.line.name} train.</p>
      <p>{this.relevantDelays()}</p>
      <ul>{this.stationNames()}</ul>
      </div>
    )
  }
}
