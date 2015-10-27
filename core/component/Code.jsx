var React = require('react')

module.exports =  React.createClass({
  render : function(){
    return <pre>
      <code>{this.props.children}</code>
    </pre>
  }
})