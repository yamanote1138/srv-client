var srv = require('../lib/srv.js'),
	prompt = require('prompt');

	
var srvClient;

prompt.start();

prompt.get(['host'], function (err, result) {
	if (err) { console.log(err); return; }
			
	srvClient = new srv({
		host: result.host
	});

	srvClient.connect(function(){
		awaitCmd();
	});

});

function handleCmd(cmd){
	switch(cmd){
		case 'z':
			srvClient.laserOn();
			awaitCmd();
			break
		case 'Z':
			srvClient.laserOff();
			awaitCmd();
			break
		case 'f':
			srvClient.forward();
			awaitCmd();
			break
		case 'b':
			srvClient.backward();
			awaitCmd();
			break
		case 'l':
			srvClient.left();
			awaitCmd();
			break
		case 'r':
			srvClient.right();
			awaitCmd();
			break
		case 's':
			srvClient.stop();
			awaitCmd();
			break
		case 'd':
		case 'D':
			srvClient.disconnect();
			process.exit(code=0);
			break
		default:
			console.log('unknown cmd');
			awaitCmd();
			break
	}
}

function awaitCmd(){
	prompt.get(['cmd'], function (err, result){
		if (err) {
			console.log(err);
			srvClient.disconnect();
			process.exit(1);
		}
		handleCmd(result.cmd);
	})
}