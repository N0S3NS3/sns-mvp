// Initialize SNS
var app = require('express')(),
	config = require('./config'),
	aws = require('aws-sdk');

aws.config.update({
	region: config.region,
	accessKeyId: config.accessKeyId,
	secretAccessKey: config.secretAccessKey
});

var sns = new aws.SNS();

app.post('/publish', function(req, res) {
	publish(req.body.msg);
});

var publish = function(message) {
	sns.publish({
		TopicArn: config.TopicArn,
		Message: message
	}, function(err, data) {
		if (err) console.log(err);
		else console.log(data);
	});
};
// publish('ayyy');
app.listen(8003);