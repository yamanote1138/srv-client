var net = require('net'),
	_ = require('lodash');

function SrvClient(config) {
	config = _.extend(
		{
			host:'',
			port:10001
		},
		config
	);

	this.host = config.host;
	this.port = config.port;
	this.socket = null;
}

SrvClient.prototype = {

	connect: function(done){

		// connect to srv1, return connected socket obj
		this.socket = net.connect({host: this.host, port: this.port}, function() {
			// connect listener
			console.log('socket connected');
		});
		this.socket.on('data', function(data) {
			console.log(data.toString());
		});

		this.socket.on('end', function() {
			console.log('socket disconnected');
		});
		done();
	},

	laserOn: function(){
		// turn laser on (send 'l')
		this.socket.write('l');
	},

	laserOff: function(){
		// turn laser on (send 'L')
		this.socket.write('L');
	},

	forward: function(){
		this.socket.write('8');
	},

	backward: function(){
		this.socket.write('2');
	},

	stop: function(){
		this.socket.write('5');
	},

	left: function(){
		this.socket.write('0');
	},

	right: function(){
		this.socket.write('.');
	},

	disconnect: function(){
		this.socket.end();
	}
};

exports = module.exports = SrvClient;