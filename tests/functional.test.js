const SrvClient = require('../lib/srvClient.js');
const prompt = require('prompt'); // eslint-disable-line node/no-unpublished-require
let client;

prompt.start();

prompt.get(['host'], function (err, result) {
	if (err) throw err;

	client = new SrvClient({
		host: result.host
	});

	client.connect(function(){
		awaitCmd();
	});
});

function handleCmd(cmd){
	switch(cmd){
		case 'z':
			client.laserOn();
			awaitCmd();
			break;
		case 'Z':
			client.laserOff();
			awaitCmd();
			break;
		case 'f':
			client.forward();
			awaitCmd();
			break;
		case 'b':
			client.backward();
			awaitCmd();
			break;
		case 'l':
			client.left();
			awaitCmd();
			break;
		case 'r':
			client.right();
			awaitCmd();
			break;
		case 's':
			client.stop();
			awaitCmd();
			break;
		case 'd':
		case 'D':
			client.disconnect();
			process.exitCode = 0;
			break;
		default:
			throw new Error('unknown command');
	}
}

function awaitCmd(){
	prompt.get(['cmd'], function (err, result){
		if (err) {
			client.disconnect();
			throw(err);
		}
		handleCmd(result.cmd);
	});
}
