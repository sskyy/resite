require('node-jsx').install({extension: '.jsx'})

var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var React= require('react')
var ReactDom = require('react-dom/server')
var Translator = require('./Translator.js')
var RootPath = path.join(__dirname, '../')

function requireComponents( componentPath ){
  var components = {}
  console.log("reading", componentPath)
  var files = fs.readdirSync( componentPath )
  files.forEach(fileName=>{
    if( /\.$/.test( fileName) ) return

    if( /\.jsx/.test( fileName) ){
      components[fileName.replace(/\.jsx$/,'')] = require( path.join(componentPath, fileName) )
    }else{
      //TODO 检测是否是文件夹
      //文件夹
      if( fs.existsSync( path.join(componentPath, fileName, 'index.jsx'))){
        //这只是个包装资源的文件夹
        components[fileName.replace(/\.jsx$/,'')] = require( path.join(componentPath, fileName, 'index.jsx') )
      }else{
        //这是个包含着一系列组件的文件夹
        _.extend( components, requireComponents(path.join(componentPath, fileName )))
      }
    }
  })

  return components
}


function Builder( options ){
  options = _.defaults( options||{}, {
    defaultComponents  : requireComponents(path.join(RootPath,'./core/component')),
    rootPath : RootPath,
    pagePath : 'sections',
    themePath : 'theme',
    componentPath : null,
    outputPath : 'site'
  })

  this.options = options


  var components = options.defaultComponents||{}
  if( options.componentPath ) _.extend( components, requireComponents(path.join( options.rootPath, options.componentPath )))

  _.extend(components,  requireComponents(path.join(this.options.rootPath, this.options.themePath,'component')))
  this.components = components
}


Builder.prototype.buildOne = function( absolutePagePath ){
  var fileName = absolutePagePath.split('/').pop().split('.').shift()
  var outputFile = path.join(this.options.rootPath, this.options.outputPath, 'pages', `${fileName}.html`)
  var content = fs.readFileSync( absolutePagePath, {encoding:'utf8'})

  fs.writeFileSync( outputFile, ReactDom.renderToStaticMarkup(
    React.createElement(Translator, {components:this.components, content:content})
  ))
}


Builder.prototype.build= function(  ) {

  //TODO 改成遍历
  fs.readdirSync( path.join( this.options.rootPath, this.options.pagePath) ).forEach( fileName =>{
    if( /\.$/.test( fileName )) return
      this.buildOne( path.join( this.options.rootPath, this.options.pagePath, fileName))
  })
}

module.exports = Builder