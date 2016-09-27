class FilterLine extends React.Component {
  constructor() {
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



  render () {
    return(
      <div id="line-input-container">
      <h3>Subway Lines</h3>
        <section>
          <span>Show/Hide all train lines</span>
          <input onClick={this.toggleAllCheckboxes} ref="selectbox" type="checkbox" defaultChecked={true} />
        </section>
        <section>
        {
          this.props.lines.map((line,i) => {
            return (
              <Line gatherCheckboxes={this.gatherCheckboxes} toggleLineCheckbox={this.props.toggleLineCheckbox} data={line} key={i} />
            )
          })
        }
        </section>
      </div>
    );
  }
}

