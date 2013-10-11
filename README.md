srv-client
=============

node module to facilitate connection to and control of an SRV-1 Surveyor robot via tcp

## Usage

setup, configuration and connect

```javascript
var SrvClient = require('srv-client');

var client = new SrvClient({
	host: 'http://domain.com:1138'
});

client.connect(function(err){
	// handle error and/or do stuff
});
```
move in specified direction (supported: forward, backward, left, right)

```javascript
client.go('forward', function(err){
	// handle error and/or do stuff
});
```
stop moving

```javascript
client.stop(function(err){
	// handle error and/or do stuff
});
```
turn laser on or off

```javascript
client.setLaser('on', function(err){
	// handle error and/or do stuff
});
```
## Additional Info

full list of motor commands are specified here:
[http://www.surveyor.com/SRV_protocol.html]
