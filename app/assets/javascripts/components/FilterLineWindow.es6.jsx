class FilterLineWindow extends React.Component {
  constructor() {
    super()
    this.state = {
      linesDisplayed: false
    }
    this.toggleLines = this.toggleLines.bind(this);
  }

  toggleLines(e){
   e.preventDefault();
   let shouldToggleLines = !this.state.linesDisplayed

   this.setState({
     linesDisplayed: shouldToggleLines
   })
 }


  render() {
    return(
      <div className="panel panel-default" id="line-input-container">
      <div className="panel-body">
      <h2 onClick={this.toggleLines}>Subway Lines</h2>
      { this.state.linesDisplayed ? <LineList toggleLineCheckbox={this.props.toggleLineCheckbox} lines={this.props.lines} /> : null }
      </div>
      </div>
    )
  }
}
