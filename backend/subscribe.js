const express = require('express');
const http = require('http');

const mqtt = require('mqtt');
const Influx = require('influx');

const app = express();

const client = mqtt.connect('mqtt://220.90.129.47:1883');
client.subscribe('#');

/*
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'backend',
  schema: [
    {
      measurement: 'hehetable',
      fields: {
        temp2: Influx.FieldType.INTEGER,
      },
      tags: ['temp', 'temp1'],
    },
  ],
});
*/
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'backend',
  schema: [
    {
      measurement: 'plcdata',
      fields: {
        // DataTime: Influx.FieldType.DataTime,
        Start: Influx.FieldType.BOOLEAN,
        No1PartsError: Influx.FieldType.BOOLEAN,
        No1_Action: Influx.FieldType.BOOLEAN,
        No2_Action: Influx.FieldType.BOOLEAN,
        No3Ready: Influx.FieldType.BOOLEAN,
        ColorSensor: Influx.FieldType.BOOLEAN,
        VisionSensor: Influx.FieldType.INTEGER,
        Reset: Influx.FieldType.BOOLEAN,
        no1_on_off: Influx.FieldType.BOOLEAN,
        no2_on_off: Influx.FieldType.BOOLEAN,
        no3_on_off: Influx.FieldType.BOOLEAN,
        sensor1_on_off: Influx.FieldType.BOOLEAN,
        sensor2_on_off: Influx.FieldType.BOOLEAN,
        No1Delay: Influx.FieldType.INTEGER,
        No1Count: Influx.FieldType.INTEGER,
        No2Count: Influx.FieldType.INTEGER,
        No3Count: Influx.FieldType.INTEGER,
        lamp_green: Influx.FieldType.BOOLEAN,
        lamp_yellow: Influx.FieldType.BOOLEAN,
        lamp_red: Influx.FieldType.BOOLEAN,
        No3Motor1: Influx.FieldType.INTEGER,
        No3Motor2: Influx.FieldType.INTEGER,
        No1ChipFull: Influx.FieldType.BOOLEAN,
        No2Chip: Influx.FieldType.BOOLEAN,
        No2CubeFull: Influx.FieldType.BOOLEAN,
        No2InPoint: Influx.FieldType.BOOLEAN,
        No2OutPoint: Influx.FieldType.BOOLEAN,
        No2Sol: Influx.FieldType.BOOLEAN,
        No2SolAction: Influx.FieldType.BOOLEAN,
        No2BackToSquare: Influx.FieldType.BOOLEAN,
        No2Mode: Influx.FieldType.BOOLEAN,
        No3Chip: Influx.FieldType.BOOLEAN,
        VisionCmdMemory: Influx.FieldType.BOOLEAN,
        No3DiceReading: Influx.FieldType.INTEGER,
        Emergency: Influx.FieldType.BOOLEAN,
        OutputLimit: Influx.FieldType.INTEGER,
        DiceValue: Influx.FieldType.INTEGER,
        DiceComparisonValue: Influx.FieldType.INTEGER,
        ColorSensorSensing: Influx.FieldType.BOOLEAN,
        No3Gripper: Influx.FieldType.BOOLEAN,
      },
      tags: ['DataTime'],
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
  console.log(`0: ${topic}: ${payload}`);
  // console.log(`2: ${topic}: ${JSON.stringify(payload)}`);
  // console.log(`2: ${topic}: ${JSON.parse(payload).tags}`);
  console.log(`1: ${topic}: ${JSON.parse(payload).Wrapper}`);
  console.log(`2: ${topic}: ${JSON.parse(payload).Wrapper[0]}`);
  console.log(`3: ${topic}: ${JSON.parse(payload).Wrapper[1]}`);
  console.log(`4: ${topic}: ${JSON.parse(payload).Wrapper[1].tagId}`);
  console.log(`4: ${topic}: ${JSON.parse(payload).Wrapper[1].name}`);

  const keys = [];
  const values = [];
  let tags = {};
  let fields = {};

  for (let i = 0; i < JSON.parse(payload).Wrapper.length; i += 1) {
    keys[i] = JSON.parse(payload).Wrapper[i].name;
    values[i] = JSON.parse(payload).Wrapper[i].value;
    console.log(i, JSON.parse(payload).Wrapper.length, keys[i], values[i]);
  }
  console.log('keys: ', keys);
  console.log('values: ', values);

  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] === 'DataTime') {
      tags = {
        [keys[i]]: values[i],
      };
    } else {
      fields = {
        ...fields,
        [keys[i]]: values[i],
      };
    }
    console.log(i, keys.length);
    console.log('tags: ', tags);
    console.log('fields: ', fields);
  }

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
      measurement: 'plcdata',
      tags,
      fields,
    },
  ], {
    // database: 'backend',
    // retentionPolicy: '1d',
    precision: 's', // 정밀도 (s)초
  }).catch((error) => {
    console.error(`Error saving data to InfluxDB! ${error.stack}`);
  });
});
