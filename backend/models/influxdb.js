const Influx = require('influx');
const dotenv = require('dotenv');
const influxConfig = require('../config/influxConfig');
const logger = require('../lib/logger');

dotenv.config();

class influx extends Influx.InfluxDB {
  constructor() {
    // eslint-disable-next-line no-this-before-super
    super();
    // this.influxx = new Influx.InfluxDB(influxConfig);
    this.influxx = new Influx.InfluxDB({
      ...influxConfig,

      /* schema: [
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
          // tags: ['temp', 'temp1'],
        },
      ], */
    });
  }

  // eslint-disable-next-line class-methods-use-this
  start(callback) {
    return new Promise((resolve, reject) => {
      this.influxx.getDatabaseNames()
      // eslint-disable-next-line consistent-return
        .then((databaseName) => {
          if (!databaseName.includes(influxConfig.database)) {
            console.log(`My database names are ${databaseName.join(', ')}`);
            console.log('and there is not the database');
            return this.influxx.createDatabase(influxConfig.database);
          }
          console.log(`(${influxConfig.database}) database already exists`);
          resolve(influxConfig.database);
        }).catch((err) => {
          console.error(`Error creating Influx database! ${influxConfig.database}`);
          console.log(err);
          console.log(({ err }));
        });
    });
  }
}
module.exports = influx;
