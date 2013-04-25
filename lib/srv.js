var request = require('request'),
	util = require('utile');

function SrvClient(config) {
	config = util.mixin(
		{
			host:'',
			port:10001
		},
		config
	);

	this.host = config.host;
	this.port = config.port;
};

SrvClient.prototype = {
	
	connect: function(){
		// connect to srv1, return connected socket obj
	},

	laserOn: function(){
		// turn laser on (send 'l')
	},

	laserOff: function(){
		// turn laser on (send 'L')
	},

	disconnect: function(){
		//disconnect socket
	}
};
