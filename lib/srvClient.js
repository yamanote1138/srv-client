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

	_sendCmd: function(cmd, done){
		this.socket.write(cmd, 'UTF8', done);
	},

	connect: function(done){

		// connect to srv1, return connected socket obj
		this.socket = net.connect({host: this.host, port: this.port}, function() {
			// connect listener
			console.log('socket connected');
		});

		// TODO: surface event listeners so user can decide how to handle
		// TODO: implement logging/debugging mechanism
		this.socket.on('data', function(data) {
			console.log(data.toString());
		});

		this.socket.on('end', function() {
			console.log('socket disconnected');
		});
		done();
	},

	setLaser: function(status, done){
		this._sendCmd(status=='on' ? 'L' : 'l', done);
	},

	go: function(direction, done){
		var cmd;
		switch(direction){
			case 'foreward':
			case 'forward':
				cmd='8';
				break;
			case 'backward':
			case 'back':
				cmd='2';
				break;
			case 'left':
				cmd='0';
				break;
			case 'right':
				cmd='.';
				break;
			default:
				return done('unsupported direction');
		}
		this._sendCmd(cmd, done);
	},

	stop: function(done){
		this._sendCmd('5', done);
	},

	disconnect: function(){
		this.socket.end();
	},

	// the following are just to support backward compatibility and will be removed as of v1 release
	laserOn: function(done){ this.setLaser('on', done); },
	laserOff: function(done){ this.setLaser('off', done); },
	forward: function(done){ this.go('forward', done); },
	backward: function(done){ this.go('backward', done); },
	left: function(done){ this.go('left', done); },
	right: function(done){ this.go('right', done); }

};

exports = module.exports = SrvClient;