class FilterLine extends React.Component {
  render () {
    return(
      <div id="line-input-container">
      <h2>Subway Lines</h2>
      <h4> Solid Line: trains are running</h4>
      <h4> Dashed Line: trains are delayed</h4>
        <section>
          <input ref="selectbox" type="checkbox" value="Select Line" /><span>Check/Uncheck all boxes</span>
        </section>

        {
          this.props.lines.map((line,i) => {
            return (
              <Line toggleLineCheckbox={this.props.toggleLineCheckbox} data={line} key={i} />
            )
          })
        }
      </div>
    );
  }
}

