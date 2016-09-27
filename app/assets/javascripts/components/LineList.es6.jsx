class LineList extends React.Component {

  constructor(){
    super()
    this.toggleAllCheckboxes = this.toggleAllCheckboxes.bind(this)
    this.gatherCheckboxes = this.gatherCheckboxes.bind(this)
    this.checkboxes = []
  }

  toggleAllCheckboxes() {
    this.props.lines.forEach((line) => {
      this.props.toggleLineCheckbox(line.name, this.refs.selectbox.checked)
    })

    this.checkboxes.forEach((box) => {
      box.checked = this.refs.selectbox.checked
    })
  }

  gatherCheckboxes(box) {
    this.checkboxes.push(box)
  }


render() {
  return(
    <div>
    <h4> Solid Line: trains are running</h4>
    <h4> Dashed Line: trains are delayed</h4>
      <section>
        <input onClick={this.toggleAllCheckboxes} ref="selectbox" type="checkbox" defaultChecked={true} /><span>Show/Hide all lines</span>
      </section>
      {
        this.props.lines.map((line,i) => {
          return (
            <Line gatherCheckboxes={this.gatherCheckboxes} toggleLineCheckbox={this.props.toggleLineCheckbox} data={line} key={i} />
          )
        })
      }
    </div>
  )
}

}
