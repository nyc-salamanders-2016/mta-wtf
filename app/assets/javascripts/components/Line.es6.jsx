class Line extends React.Component {
  constructor() {
    super()

    this.lineColors = {
      'RD': '#C90E0E',
      'BL': '#2B84E3',
      'GR': '#18A132',
      'SL': '#B6B5B1',
      'OR': '#D39A1D',
      'YL': '#E0ED26'
    }
  }

  componentDidMount() {
    this.props.gatherCheckboxes(this.refs.selectbox)
  }

  render () {
    var inputStyle = {
      backgroundColor: this.lineColors[this.props.data.name],
      color: "#fff",
      minWidth: "35px"
    }

    return (
      <button className={this.props.shouldBeActive ? "round-button" : "round-button round-button-clicked"} onClick={(event) => this.props.toggleLineCheckbox(this.props.data.name, !this.props.shouldBeActive)} ref="selectbox" style={inputStyle}>{this.props.data.name}</button>
    )
  }
}
