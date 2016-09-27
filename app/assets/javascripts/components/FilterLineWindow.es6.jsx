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
      <div id="line-input-container">
      <h2 onClick={this.toggleLines}>Subway Lines</h2>
      { this.state.linesDisplayed ? <LineList toggleLineCheckbox={this.toggleLineCheckbox} lines={this.props.lines} /> : null }
      </div>
    )
  }
}
