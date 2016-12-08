var http = require('http');
    
class httpClass {
    constructor(port, listener){
        var server = http.createServer(listener);
        server.listen(port, function () {
            console.log("Server listening on: http://localhost:%s", port);
        });
    }

    notImplemented(req, res) {
        res.writeHead(501, "Not implemented", {
            'Content-Type': 'text/html'
        });
        res.end('Not implemented!');
    }

    notFound(req, res) {
        res.writeHead(404, "Not found", {
            'Content-Type': 'text/html'
        });
        res.end('Not found.');
    }
    
    okStatus(req, res, body) {
        res.writeHead(200, "OK", {
            'Content-Type': 'text/html'
        });
        res.end(body);
    }
}

module.exports = httpClass;