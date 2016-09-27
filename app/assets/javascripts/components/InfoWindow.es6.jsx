class InfoWindow extends React.Component {
//   constructor(){
//   super()
//     this.state = {
//       info: something from params idk
//   }
// }
  stationNames(line) {
    return line.stations.reduce((result, station, index, allStations) => {
      return result + station.name + "\n" + (index < allStations.length - 1 ? ', ' : ' and ')
    }, '')
  }

  lineInfo(line) {
    if (line) return `Right now, it stops at: ${this.stationNames(line)}`
  }

  render(){
    return(
      <div id="info-container" >
        <h4>Hover over line for more info</h4>
        <h3>
          { this.props.showLine ? 'Test' : <p>This is the {this.props.showLine} train.</p> }
        </h3>
        <p>This is the {this.props.showLine} train.</p>
        <p>{this.lineInfo(this.props.lines.find((line) => line.name === this.props.showLine))}</p>
      </div>
    )
  }
}
