var SubscriptionManager = (function () {
	this.subscriptions;
	this.sns;
	this.topicArn;
	this.publisher;
	var Subscriber = function(owner, protocol, endpoint) {
		this.owner = owner;
		this.protocol = protocol;
		this.endpoint = endpoint;
		Subscriber.prototype.getEndpoint = function() { return this.endpoint; }
		Subscriber.prototype.getProtocol = function() { return this.protocol; }
		Subscriber.prototype.getOwner = function() { return this.owner; }
	}

	return {
		initSubscriptionManager: function(sns, config, publisher) {
			var _this = this;
			_this.sns = sns,
			_this.topicArn = config.topicArn,
			_this.subscriptions = [],
			_this.publisher = publisher;
			sns.listSubscriptionsByTopic({TopicArn: _this.topicArn}, function(err, data) {
				if (err) return {status: 'error', msg: err};
				for (var i = 0; i < data.Subscriptions.length; i++) {
					_this.subscriptions.push(new Subscriber(
						data.Subscriptions[i].Owner,
						data.Subscriptions[i].Protocol,
						data.Subscriptions[i].Endpoint)
					);
				}
			});
		},
		getCurrentSubscribers: function() {
			return this.subscriptions;
		},
		addSubscriber: function(protocol, endpoint) {
			_this = this;
			var subscriptionArguments = {
				Protocol: protocol,
				TopicArn: this.topicArn,
				Endpoint: endpoint
			};
			console.log(subscriptionArguments);
			// var subscriber = new Subscriber(owner, protocol, endpoint);
			this.sns.subscribe(subscriptionArguments, function(err, data) {
				if (err) return {status: 'error', msg: err};
				console.log(data);
				// _this.subscriptions.push(subscriber);
			});
		},
		removeSubscriber: function(subscriptionArn) {

		},
		notifySubscribers: function(message) {
			this.publisher.publishMessage(this.sns, message, this.topicArn, this.subscriptions);
		}
	}
})();
module.exports = function(sns, config, publisher) {
	SubscriptionManager.initSubscriptionManager(sns, config, publisher);
	return SubscriptionManager;
};