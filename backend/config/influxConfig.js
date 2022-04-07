const dotenv = require('dotenv');
const Influx = require('influx');

dotenv.config();

const influxConfig = {
  host: process.env.TSDB_HOST || 'localhost',
  port: process.env.TSDB_PORT || '8087',
  database: process.env.TSDB_DATABASE || 'backends',
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
};

// console.log(process.env.TSDB_HOST);
// console.log(process.env.TSDB_PORT);
// console.log(process.env.TSDB_DATABASE);

module.exports = influxConfig;
