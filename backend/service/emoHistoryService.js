const logger = require('../lib/logger');
const emoHistoryDao = require('../dao/emoHistoryDao');

const service = {
  // 작업현황 list 조회
  async list() {
    let result = null;

    try {
      result = await emoHistoryDao.selectList();
      logger.debug(`(emoHistoryService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(emoHistoryService.list) ${err.toString()}`);
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
      inserted = await emoHistoryDao.insert(params);
      logger.debug(`(emoHistoryService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(emoHistoryService.reg) ${err.toString()}`);
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
      result = await emoHistoryDao.selectInfo(params);
      logger.debug(`(emoHistoryService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(emoHistoryService.info) ${err.toString()}`);
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
      result = await emoHistoryDao.update(params);
      logger.debug(`(emoHistoryService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(emoHistoryService.edit) ${err.toString()}`);
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
      result = await emoHistoryDao.delete(params);
      logger.debug(`(emoHistoryService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(emoHistoryService.delete) ${err.toString()}`);
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
