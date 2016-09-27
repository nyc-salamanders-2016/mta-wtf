class InfoWindow extends React.Component {   
  render(){

  var line = this.props.lines.find((line) => line.name === this.props.showLine)

    return(
      <div id="info-container">
        <h4><em>Hover over line for more info</em></h4>
        <h3>This is the {this.props.showLine} train.</h3>
    
        {line ?  
                line.stations.map((station,i) => {
                  return (
                    <Station data={station} key={i} />
                  )
                })
          : 
          null}
 
      </div>
    )
  }
}
