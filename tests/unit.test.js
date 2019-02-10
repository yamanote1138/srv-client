const assert = require('assert');
const SrvClient = require('../lib/srvClient');

describe('SrvClient', function(){

  describe('constructor', function(){

    describe('host validation', function(){

      it('should throw error when host is not valid', function(){
        assert.throws(
          function(){
            new SrvClient({host:null, port:1138});
          },
          Error
        );

        assert.throws(
          function(){
            new SrvClient({host:123, port:1138});
          },
          Error
        );
      });

      it('should not throw error when host is valid', function(){
        assert.doesNotThrow(
          function(){
            new SrvClient({host:'192.168.1.123', port:1138});
          },
          Error
        );
      });

    });

    describe('port validation', function(){

      it('should throw error when specified port is not valid', function(){
        assert.throws(
          function(){
            new SrvClient({host:'192.168.1.123', port:null});
          },
          Error
        );
        assert.throws(
          function(){
            new SrvClient({host:'192.168.1.123', port:'foo'});
          },
          Error
        );
        assert.throws(
          function(){
            new SrvClient({host:'192.168.1.123', port:70000});
          },
          Error
        );
      });

      it('should not throw error when port is valid', function(){
        assert.doesNotThrow(
          function(){
            new SrvClient({host:'192.168.1.123', port:1138});
          },
          Error
        );
      });

    });

  });

});
