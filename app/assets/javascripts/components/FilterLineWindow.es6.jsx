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
      <div className="panel panel-default" id="line-wrapper">
      <div className="panel-heading" id="line-header"><h2 onClick={this.toggleLines}>Choose A Line</h2></div>
       <div className="panel-body" id="line-input-container">
          { this.state.linesDisplayed ? <LineList lineToggles={this.props.lineToggles} toggleLineCheckbox={this.props.toggleLineCheckbox} lines={this.props.lines} /> : null }
        </div>
      </div>
    )
  }
}
