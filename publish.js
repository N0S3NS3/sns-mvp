module.exports = {
	publishMessage : function(sns, message, topicArn, subscribers) {
		for (var i = 0; i < subscribers.length; i++) {
			sns.publish({Message: message, TopicArn: topicArn}, function(err, data) {
				console.log(data);
			});
		}
	}
};