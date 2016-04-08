var http = require('http')
var fs = require('fs')
var path = require('path')
var subscribe = require('redis-subscribe-sse')
var port = process.env.PORT || 3000
var redis_host = process.env.REDIS_HOST
var redis_port = process.env.REDIS_PORT
var redis_pass = process.env.REDIS_PASS


// http server

var server = http.createServer(function(req, res) {

  if (matches = req.url.match(/^\/([^\/]+)\/([^\/]+)$/)) {
    var owner = matches[1]
    var module = matches[2]
    var channel = "babl:log:module:" + owner + '/' + module

    var sse = subscribe({
      channels: [channel],
      host: redis_host,
      port: redis_port,
      clientOptions: {
        auth_pass: redis_pass
      }
    })

    req.setTimeout(0)

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    sse.pipe(res).on('close', function() {
      sse.close()
    })
  } else {
    res.statusCode = 404
    res.end("404")
  }
})

server.listen(port)
