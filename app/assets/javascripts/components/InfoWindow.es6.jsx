class InfoWindow extends React.Component {
//   constructor(){
//   super()
//     this.state = {
//       info: something from params idk
//   }
// }

  render(){
    return(
      <div id="info-container">
        <p>This is the {this.props.showNow} train.</p>
      </div>
    )
  }
}
