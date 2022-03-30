const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost');
client.publish('temp', '10');
