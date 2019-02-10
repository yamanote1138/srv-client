srv-client [![Build Status](https://travis-ci.org/yamanote1138/srv-client.png?branch=master)](https://travis-ci.org/yamanote1138/srv-client)
=============

node module to facilitate connection to and control of an SRV-1 Surveyor robot via tcp

[![NPM](https://nodei.co/npm/srv-client.png?compact=true)](https://nodei.co/npm/srv-client/)

## Usage

configure and connect
```javascript
const SrvClient = require('srv-client');

let client = new SrvClient({
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
