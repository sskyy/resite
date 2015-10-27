var marked = require('marked')
var React = require('react')

module.exports = React.createClass({
  render(){
    return <div dangerouslySetInnerHTML={{__html:marked(this.props.children)}}></div>
  }
})
