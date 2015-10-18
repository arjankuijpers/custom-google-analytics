/**
 * custom (Google)Analytics (for CocoonJS).
 * @author Arjan Kuijpers <arjankuijpers@live.nl>
 * @version 1.0.0
 * @license MIT
 */

http = require('http');
https = require('https');
fs = require('fs');


var AnalyticsURL = "https://google-analytics.com/collect";

server = http.createServer( function(req, res) {

    console.dir(req.param);
    
    if (req.method == 'GET') {
        console.log("get request received.\n" + 
        req.url);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("OK");
        
        _sendDataToGS(req.url);
    } else {
        console.log("WARNING: POST received.");
        
        // var body = '';
        // req.on('data', function (data) {
        //     body += data;
        //     console.log("Partial body: " + body);
        // });
        
        // req.on('end', function () {
        //     console.log("Body: " + body);
        // });
        
        res.writeHead(405, {'Content-Type': 'text/html'});
        res.end('post received');
        
    }

});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);

    
    
/**
* This is an system function, do NOT call this function, but use other functions that call this function internally.
* @private
*/
var _sendDataToGS = function(params){
    console.log("sendDataToGS");
    var resultURL = AnalyticsURL + params.substring(1,params.length);
    console.log(resultURL);
    
   https.get(resultURL, function(res) {
        console.log("sendDataToGS - Got response: " + res.statusCode);
    }).on('error', function(e) {
        console.log("dropped proxied analytics data.\n sendDataToGS - Got error: " + e.message);
    });  
}





