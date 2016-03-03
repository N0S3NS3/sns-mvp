// Initialize SNS
var app = require('express')(),
	config = require('./config'),
	aws = require('aws-sdk');

aws.config.update({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey
});

var sns = new aws.SNS(),
	subscriber = require('./subscription')(sns, config);

setTimeout(function() {
	console.log(subscriber.getCurrentSubscribers());
}, 1000);

app.post('/publish', function(req, res) {
	publish(req.body.msg);
});
app.post('/subscribe', function(req, res) {

});
app.post('/unsubscribe', function(req,res) {

});

app.listen(8003);