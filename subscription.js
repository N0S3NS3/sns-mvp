var SubscriptionManager = (function () {
	this.subscriptions;
	this.sns;
	this.topicArn;
	var Subscriber = function(owner, endpoint) {
		this.owner = owner;
		this.protocol = 'http';
		this.endpoint = endpoint;
		Subscriber.prototype.getEndpoint = function() { return this.endpoint; }
		Subscriber.prototype.getProtocol = function() { return this.protocol; }
		Subscriber.prototype.getOwner = function() { return this.owner; }
	}

	return {
		initSubscriptionManager: function(sns, config) {
			var _this = this;
			_this.sns = sns, _this.topicArn = config.topicArn, _this.subscriptions = [];
			sns.listSubscriptionsByTopic({TopicArn: _this.topicArn}, function(err, data) {
				if (err) return {status: 'error', msg: err};
				for (var i = 0; i < data.Subscriptions.length; i++) {
					_this.subscriptions.push(new Subscriber(data.Subscriptions[i].Owner, data.Subscriptions[i].Endpoint));
				}
			});
		},
		getCurrentSubscribers: function() {
			return this.subscriptions;
		},
		addSubscriber: function(owner, endpoint) {
			_this = this;
			var subscriptionArguments = {
				Protocol: 'http',
				TopicArn: this.topicArn,
				Endpoint: endpoint
			};
			var subscriber = new Subscriber(owner, endpoint);
			sns.subscribe(subscriptionArguments, function(err, data) {
				if (err) return {status: 'error', msg: err};
				_this.subscriptions.push(subscriber);
			});
		},
		removeSubscriber: function(subscriptionArn) {

		}
	}
})();
module.exports = function(sns, config) {
	SubscriptionManager.initSubscriptionManager(sns, config);
	return SubscriptionManager;
};