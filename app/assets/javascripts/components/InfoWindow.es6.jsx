class InfoWindow extends React.Component {
//   constructor(){
//   super()
//     this.state = {
//       info: something from params idk
//   }
// }
  stationNames(line) {
    return line.stations.reduce((result, station, index, allStations) => {
      return result + station.name + (index < allStations.length - 1 ? ', ' : ' and ')
    }, '')
  }

  lineInfo(line) {
    if (line) return `Right now, it stops at: ${this.stationNames(line)}`
  }

  render(){
    return(
      <div id="info-container" >
        <h4><em>Hover over line for more info</em></h4>
        <h3>This is the {this.props.showLine} train.</h3>
        <p>{this.lineInfo(this.props.lines.find((line) => line.name === this.props.showLine))}</p>
      </div>
    )
  }
}
