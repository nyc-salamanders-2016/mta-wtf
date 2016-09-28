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
      <div className="checkbox">
        <label><input onClick={this.toggleAllCheckboxes} ref="selectbox" type="checkbox" defaultChecked={true} />Show/Hide all lines</label>
      </div>
      <section>
      {
        this.props.lines.map((line,i) => {
          return (
            <Line shouldBeActive={this.props.lineToggles[line.name]} gatherCheckboxes={this.gatherCheckboxes} toggleLineCheckbox={this.props.toggleLineCheckbox} data={line} key={i} />
          )
        })
      }
      </section>
    </div>
  )
}

}
