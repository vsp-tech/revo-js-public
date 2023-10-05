const mqtt = require("async-mqtt");

const client = mqtt.connect("tpc://192.0.0.2:1883");

client.subscribe(
	"revojs/feedback",
	  (err) => !err && console.log("Subscribed to revojs/sound")
)

function play(sound){
	console.log("play", sound);
	client.publish('revojs/sound', `play,${sound}`);
}
function reset(){
	client.publish('revojs/sound', 'reset');
}

function fwd(){
	client.publish('revojs/robot', 'fwd');
}



function bkd(){
	client.publish('revojs/robot', 'bkd');
}
client.on("connect", () => {
	console.log("connected");
	start();
	
});

client.on("message", (topic, received_message) => {
	if(loop(received_message.toString("utf-8"))){
		client.end();
	};
});


function start(){
	reset();
	fwd();
}

// correct order is 6,2,5,3,1,4 
function loop(message) {
	console.log(message);
}



