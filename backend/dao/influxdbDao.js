const Influx = require('influx');
const influxConfig = require('../config/influxConfig');
const models = require('../models/index');

const influx = new Influx.InfluxDB(influxConfig);

const dao = {
  /* selectList() {
    return new Promise((resolve, reject) => {
      influx
        .query('select')
        .then((selectList) => {
          resolve(selectList);
        }).catch((err) => {
          reject(err);
        });
    });
  }, */
  insert(params) {
    return new Promise((resolve, reject) => {
      influx.writePoints([
        {
          measurement: 'plcdata',
          tags: params.tags,
          fields: params.fields,
        },
      ], { precision: 's' })
        .then((inserted) => {
          resolve(inserted);
        }).catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
