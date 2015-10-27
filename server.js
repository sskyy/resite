var http = require('http');
var ecstatic = require('ecstatic');
var argv = require('optimist').argv;

http.createServer(
  ecstatic({ root: __dirname + '/site' , baseDir : argv.baseDir || '/'})
).listen(argv.port || 4000);

console.log('Listening on :4000');