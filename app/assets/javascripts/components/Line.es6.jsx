class Line extends React.Component {
  constructor() {
    super()

    this.lineColors = {
      1: '#EE352E',
      2: '#EE352E',
      3: '#EE352E',
      4: '#00933C',
      5: '#00933C',
      6: '#00933C',
      '6E': '#00933C',
      A: '#0039A6',
      C: '#0039A6',
      E: '#0039A6',
      B: '#FF6319',
      D: '#FF6319',
      F: '#FF6319',
      M: '#FF6319',
      G: '#6CBE45',
      J: '#996633',
      Z: '#996633',
      L: '#A7A9AC',
      N: '#FCCC0A',
      Q: '#FCCC0A',
      R: '#FCCC0A',
      S: '#808183',
      7: '#B933AD',
      '7E': '#B933AD'
    }
  }

  componentDidMount() {
    this.props.gatherCheckboxes(this.refs.selectbox)
  }

  render () {
    var inputStyle = {
      backgroundColor: this.lineColors[this.props.data.name],
      color: "#fff"
    }

    return(
      <div>
          <input className="round-button" onChange={(event) => this.props.toggleLineCheckbox(this.props.data.name, this.refs.selectbox.checked)} ref="selectbox" type="submit" value={this.props.data.name} defaultChecked={true} style={inputStyle}/>
      </div>
    );
  }
}
