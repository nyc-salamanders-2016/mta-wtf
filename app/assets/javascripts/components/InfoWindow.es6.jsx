class InfoWindow extends React.Component {
//   constructor(){
//   super()
//     this.state = {
//       info: something from params idk
//   }
// }

  render(){
    return(
      <div id="info-container" >
        <p>This is the {this.props.showLine} train.</p>
        <p>{this.props.mouseLat}, {this.props.mouseLng}</p>
        <pre><code>{JSON.stringify(this.props.lines.find((line) => line.name === this.props.showNow), null, 3)}</code></pre>
      </div>
    )
  }
}
