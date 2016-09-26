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
    if (line) return `Right now, it stops at ${this.stationNames(line)}`
  }

  render(){
    return(
      <div id="info-container" >
        <p>This is the {this.props.showLine} train.</p>
        <p>{this.lineInfo(this.props.lines.find((line) => line.name === this.props.showLine))}</p>
        <p>{this.props.mouseLat}, {this.props.mouseLng}</p>
        <pre><code>{JSON.stringify(this.props.lines.find((line) => line.name === this.props.showLine), null, 3)}</code></pre>
      </div>
    )
  }
}
