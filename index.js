var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var path = require('path');

var flybase = require('flybase');
var flybaseRef = flybase.init('siftninja', "chat", '<YOUR-FLYBASE-API-KEY>');

var apikey = '<YOUR-SIFT-NINJA-API-KEY>';
var url = '<YOUR-SIFT-NINJA-URL>';
var siftninja = require("siftninja")(url, apikey);

flybaseRef.on("check_content", function( req ) {
	var req = JSON.parse( req );
	var message = req.message;
	var sessionKey = req.session;
	siftninja( message ).then(function(result) {
		var result = result.body;
		result.message = message;
		if( result.response ){
			var text = ('' + message).replace( /[<>]/g, '' );
			flybaseRef.push({text:text});
		}else{
			flybaseRef.trigger( "results_"+sessionKey, result );
		}
	});
});

var serve = serveStatic('public', {
	maxAge: '1d',
	'index': ['index.html'],
	fallthrough: true
});

// Create server
var server = http.createServer(function onRequest (req, res) {
	serve(req, res, finalhandler(req, res))
})

// Listen
var port = process.env.PORT || 3000;
server.listen( port, function() {
	console.log('Server started on port ' + port );
});
