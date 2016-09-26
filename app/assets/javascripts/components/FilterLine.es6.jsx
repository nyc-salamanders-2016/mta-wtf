class FilterLine extends React.Component {
  render () {
    return(
      <div id="line-input-container">
      <h2>Subway Lines</h2>
        {
          this.props.lines.map((line,i) => {
            return (
              <Line data={line} key={i} />
            )
          })
        }
      </div>
    );
  }
}

