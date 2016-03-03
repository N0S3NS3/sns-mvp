// Initialize SNS
var express = require('express'),
	app = express(),
	config = require('./config'),
	aws = require('aws-sdk'),
	bodyParser = require('body-parser');

aws.config.update({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey
});

var sns = new aws.SNS(),
	subscriber = require('./subscription')(sns, config, require('./publish'));

app.use(bodyParser.json());

// setTimeout(function() {
// 	console.log(subscriber.getCurrentSubscribers());
// 	subscriber.notifySubscribers('Jiggle Master');
// }, 1000);

app.post('/publish', function(req, res) {
	publish(req.body.msg);
});

// {protocol: 'string', endpoint: 'string'}
app.post('/subscribe', function(req, res) {
	console.log(req.body);
	subscriber.addSubscriber(req.body.protocol, req.body.endpoint);
});
app.post('/unsubscribe', function(req,res) {

});

app.listen(8005);