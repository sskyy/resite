var React = require('react')
var jstransform = require('jstransform/simple')

var Translater = React.createClass({
  getInitialState : function(){
    return {}
  },
  render(){
    with( this.props.components ){
      var code =jstransform.transform(this.props.content,{react:true}).code;
      //console.log( this.props.content, code)
      return eval(code)
    }
  }
})

module.exports = Translater