var React = require('react')

module.exports =  React.createClass({
  render : function(){
    return <div class={`alert alert-${this.props.type}`}>{this.props.children}</div>
  }
})