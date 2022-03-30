const logger = require('../lib/logger');
const machineHistoryDao = require('../dao/machineHistoryDao');

const service = {
  // 작업현황 list 조회
  async list() {
    let result = null;

    try {
      result = await machineHistoryDao.selectList();
      logger.debug(`(machineHistoryService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // 작업지시서 등록
  async reg(params) {
    let inserted = null;

    try {
      inserted = await machineHistoryDao.insert(params);
      logger.debug(`(machineHistoryService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // 특정 작업지시서 조회
  async info(params) {
    let result = null;

    try {
      result = await machineHistoryDao.selectInfo(params);
      logger.debug(`(machineHistoryService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업지시서 수정
  async edit(params) {
    let result = null;

    try {
      result = await machineHistoryDao.update(params);
      logger.debug(`(machineHistoryService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // 특정 작업지시서 삭제
  async delete(params) {
    let result = null;

    try {
      result = await machineHistoryDao.delete(params);
      logger.debug(`(machineHistoryService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(machineHistoryService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = service;
