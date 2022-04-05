const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mqtt = require('mqtt');
const Influx = require('influx');

dotenv.config();

const app = express();

const mqttUtil = {
  mqttSubscribe(topic, message) {
    return new Promise((resolve, reject) => {
      try {
        // const client = mqtt.connect(process.env.MQTT_HOST1);
        // client.subscribe(process.env.MQTT_SUBSCRIBE);

        // client.on('message', (topic, message) => {
        // console.log(`0: ${topic}: ${message}`);
        // console.log(`1: ${topic}: ${JSON.stringify(message)}`);
        // console.log(`2: ${topic}: ${JSON.parse(message).tags}`);
        // console.log(`3: ${topic}: ${JSON.parse(message).Wrapper}`);
        // console.log(`4: ${topic}: ${JSON.parse(message).Wrapper[1].tagId}`);
        // console.log(`5: ${topic}: ${JSON.parse(message).Wrapper[1].name}`);

        const keys = [];
        const values = [];
        const processedPlcData = {
        };

        for (let i = 0; i < JSON.parse(message).Wrapper.length; i += 1) {
          keys[i] = JSON.parse(message).Wrapper[i].name;
          values[i] = JSON.parse(message).Wrapper[i].value;
          // console.log(i, JSON.parse(message).Wrapper.length, keys[i], values[i]);
        }
        // console.log('keys: ', keys);
        // console.log('values: ', values);

        for (let i = 0; i < keys.length; i += 1) {
          if (keys[i] === 'DataTime') {
            processedPlcData.tags = {
              [keys[i]]: values[i],
            };
          } else {
            processedPlcData.fields = {
              ...processedPlcData.fields,
              [keys[i]]: values[i],
            };
          }
        }
        // console.log(keys.length);
        // console.log('tags: ', tags);
        // console.log('fields: ', fields);
        console.log('processedPlcData', processedPlcData);
        // console.log('processedPlcData.tags', processedPlcData.tags);
        // console.log('processedPlcData.fields', processedPlcData.fields);
        resolve(processedPlcData);
        // });
      } catch (err) {
        reject(err);
      }
    });
  },
};

module.exports = mqttUtil;
