var assert = require("assert"),
	SrvClient = require("../lib/srvClient");

describe('SrvClient', function(){
	describe('constructor', function(){
		it('should fail when config is omitted', function(){
			assert.throws(SrvClient, Error);
		});
		it(
			'should fail when host is omitted', function(){
			assert.throws((function(){ SrvClient({port:1138}); }), Error);
		});
		it(
			'should fail when port is omitted', function(){
			assert.throws((function(){ SrvClient({host:'foo'}); }), Error);
		});
		it(
			'should not throw an error if host and port are properly specified', function(){
			assert.doesNotThrow((function(){ SrvClient({host:'foo', port:1138}); }), Error);
		});
	});
});