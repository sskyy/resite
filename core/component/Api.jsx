var React = require('react')

module.exports =  React.createClass({
  render : function(){
    return <div class='block-api'>
      <div class='api-title'>
        <i class='fa fa-map-marker' />
        <span class='api-name'>{this.props.name}</span>
      </div>
      <div class='api-description'>
        {this.props.children}
      </div>
    </div>
  }
})
