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
    return(
      <div>
          <input onChange={(event) => this.props.toggleLineCheckbox(this.props.data.name, this.refs.selectbox.checked)} ref="selectbox" type="checkbox" defaultChecked={true} /><font color={this.lineColors[this.props.data.name]}>{this.props.data.name}</font>
      </div>
    );
  }
}

