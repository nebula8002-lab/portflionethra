/**
 * Lightweight Zero-Dependency Local Static Server
 * Compatible with Node.js 6+ (no npm install required)
 * Run: node server.js
 */

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var PORT = process.env.PORT || 3000;
var BASE_DIR = __dirname;

var MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url);
  var pathname = parsedUrl.pathname;

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Prevent directory traversal
  var safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  var filePath = path.join(BASE_DIR, safePath);

  fs.stat(filePath, function (err, stats) {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + pathname);
      return;
    }

    var ext = path.extname(filePath).toLowerCase();
    var contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff'
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.listen(PORT, function () {
  console.log('Portfolio Server running at: http://localhost:' + PORT);
  console.log('Serving directory: ' + BASE_DIR);
});
