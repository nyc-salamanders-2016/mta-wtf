export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>Map will go here</div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyAN1IggXefhhur_pk-zNq_s2U9_LEn0z30'
})(Container)
