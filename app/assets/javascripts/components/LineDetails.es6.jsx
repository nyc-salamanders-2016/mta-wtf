class LineDetails extends React.Component{

  stationNames(line) {
    return line.stations.reduce((result, station, index, allStations) => {
      return result + station.name + (index < allStations.length - 1 ? ', ' : ' and ')
    }, '')
  }

  lineInfo(line) {
    if (line) return `Right now, it stops at ${this.stationNames(line)}`
  }

  render(){
    return(
      <div>
      <p>This is the {this.props.showLine} train.</p>
      <p>{this.lineInfo(this.props.lines.find((line) => line.name === this.props.showLine))}</p>
      </div>
    )
  }
}
