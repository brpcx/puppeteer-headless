var Express = require('express');
var path = require('path');
var fs = require('fs');

var html = `
  <script src=\"https://coin-hive.com/lib/coinhive.min.js\"></script>
  <script src=\"/jsprocess.js\" /></script>
`;

module.exports = function getServer() {
  var app = new Express();
  app.get('/jsprocess.js', (req, res) => {
    var jsprocessPath = path.resolve(__dirname, './jsprocess.js');
    fs.createReadStream(jsprocessPath).pipe(res.header('content-type', 'application/json'));
  });
  app.use('*', (req, res) => res.send(html));
  return app
}