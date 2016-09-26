class Line extends React.Component {
  render () {
    return(
      <div>
        <p> {this.props.data.name}</p>
        <form>
          <input ref="votebutton" type="checkbox" value="Select Line" />
        </form>
      </div>
    );
  }
}

