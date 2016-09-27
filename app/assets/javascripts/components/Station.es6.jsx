class Station extends React.Component {
  
  render(){
      let station = this.props.data
      return(
        <li>{station.name}</li>
        )
  }
}
