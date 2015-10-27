var React = require('react')


module.exports = React.createClass({

  render : function(){
    return <html >
      <head >
        <title>{this.props.title || 'Super Static Generator'}</title>
      </head>
      <body >
      <div>
        {this.props.children}
      </div>
      </body>
    </html>
  }
})