const express = require('express');
const http = require('http');

const mqtt = require('mqtt');
const Influx = require('influx');

const client = mqtt.connect('mqtt://localhost');
client.subscribe('temp1');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'backend',
  schema: [
    {
      measurement: 'hehetable',
      fields: {
        temp2: Influx.FieldType.INTEGER,
      },
      tags: ['temp'],
    },
  ],
});

influx
  .getDatabaseNames()
// eslint-disable-next-line consistent-return
  .then((names) => {
    if (!names.includes('backend')) {
      console.log(`My database names are: ${names.join(', ')}`);
      console.log('there is no database');
      return influx.createDatabase('backend');
    }
  })
  /* .then(() => {
    http.createServer(app).listen(3000, () => {
      // console.log(`My database names are2: ${names.join(', ')}`);
      console.log('Listening on port 3000');
    });
  }) */
  .catch((err) => {
    console.error('Error creating Influx database!');
    console.log(({ err }));
  });

client.on('message', (topic, payload) => {
  console.log(`1: ${topic}: ${payload}`);
  console.log(`2: ${topic}: ${JSON.stringify(payload)}`);
  console.log(`3: ${topic}: ${JSON.parse(payload)}`);
  console.log(`3: ${topic}: ${JSON.parse(payload).cpu}`);
  console.log(`3: ${topic}: ${JSON.parse(payload).core}`);
  /*
  const {
    cpu, core, disk, memory,
  } = parmas;
  const receivedData = JSON.parse();

  const influxparams = {
    measurement: topic,
    tags: {},
    fields: {},
    timestamp: '',
  };
  receivedData.forEach((e) => {
    if (e.name !== 'DataTime') {
      influxparams.fields = { ...influxparams.fields, [e.name]: Number(e.value) };
    } else {
      influxparams.tags = { ...influxparams.tags, [e.name]: e.value };
    }
  }); */

  influx.writePoints([
    {
      measurement: 'hehetable',
      tags: JSON.parse(payload).tags,
      fields: JSON.parse(payload).fields,
      // timestamp: getLastRecordedTime(),
    },
  ], {
    // database: 'backend',
    // retentionPolicy: '1d',
    precision: 's',
  }).catch((error) => {
    console.error(`Error saving data to InfluxDB! ${error.stack}`);
  });
});
