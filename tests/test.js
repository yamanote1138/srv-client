var srv = require('../lib/srv.js'),
	prompt = require('prompt'),
	assert = require('chai').assert;

describe('Srv1Client', function(done) {
	
	var srvClient;

	before(function(done){
		prompt.start();

		prompt.get(['host'], function (err, result) {
			if (err) { console.log(err); return; }
			
			srvClient = new srv({
				host: result.host
			});
			done();
		});
	});

	describe('#laserOn()', function(done) {
		it('should turn laser on and return ack', function(done) {
			srvClient.laserOn(function(err, ack){
				assert.isNull(err, 'err is not null');
				assert.isNotNull(data, 'ack is null');
				console.log(ack);
				done();
			});
		});
	});

});