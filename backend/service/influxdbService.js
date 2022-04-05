const logger = require('../lib/logger');
const influxdbDao = require('../dao/influxdbDao');
const mqttUtil = require('../lib/mqttUtil');

const service = {
  // influxdb data list 조회
  async list() {
    let result = null;

    try {
      result = await influxdbDao.selectList();
      logger.debug(`(influxdbService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(influxdbService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // plc data 입력
  async reg(topic, message) {
    let inserted = null;
    let processed = null;

    try {
      processed = await mqttUtil.mqttSubscribe(topic, message);
      logger.debug(`(influxdbService.mqttSubscribe) ${JSON.stringify(processed)}`);
    } catch (err) {
      logger.error(`(influxdbService.mqttSubscribe) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    try {
      inserted = await influxdbDao.insert(processed);
      logger.debug(`(influxdbService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(influxdbService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
};

module.exports = service;
