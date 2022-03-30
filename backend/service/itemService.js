const logger = require('../lib/logger');
const itemDao = require('../dao/itemDao');

const service = {
  // 작업현황 list 조회
  async list() {
    let result = null;

    try {
      result = await itemDao.selectList();
      logger.debug(`(itemService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.list) ${err.toString()}`);
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
      inserted = await itemDao.insert(params);
      logger.debug(`(itemService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(itemService.reg) ${err.toString()}`);
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
      result = await itemDao.selectInfo(params);
      logger.debug(`(itemService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.info) ${err.toString()}`);
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
      result = await itemDao.update(params);
      logger.debug(`(itemService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.edit) ${err.toString()}`);
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
      result = await itemDao.delete(params);
      logger.debug(`(itemService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(itemService.delete) ${err.toString()}`);
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
