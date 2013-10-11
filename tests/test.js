var SrvClient = require('../lib/srvClient.js'),
	prompt = require('prompt'),
	client;

prompt.start();

prompt.get(['host'], function (err, result) {
	if (err) { console.log(err); return; }

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
			process.exit(code=0);
			break;
		default:
			console.log('unknown cmd');
			awaitCmd();
			break;
	}
}

function awaitCmd(){
	prompt.get(['cmd'], function (err, result){
		if (err) {
			console.log(err);
			client.disconnect();
			process.exit(1);
		}
		handleCmd(result.cmd);
	});
}