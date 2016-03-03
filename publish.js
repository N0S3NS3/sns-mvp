var publish = function(message) {
	sns.publish({
		TopicArn: config.TopicArn,
		Message: message
	}, function(err, data) {
		if (err) console.log(err);
		else console.log(data);
	});
};