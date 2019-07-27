'use strict';

const net = require('net');

function SrvClient(config) {

	if(!config) throw new Error("no configuration specified");

  if(!config.host) throw new Error('host not specified');
  if(typeof(config.host) != 'string') throw new Error('host is not a string');

  if(!config.port) throw new Error('port not specified');
  if(typeof(config.port) != 'number') throw new Error('port is not a number');
  if(config.port < 0 || config.port > 65535) throw new Error('port is out of range');

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
		this.socket = net.connect({host: this.host, port: this.port}, done);
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
	}
};

module.exports = SrvClient;
