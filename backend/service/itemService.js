const logger = require('../lib/logger');
const itemDao = require('../dao/itemDao');
const tsEdukitDao = require('../dao/tsEdukitDao');

const service = {
  // 재료 list 조회
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
  // 작업 후 재료/완성품 재고값 수정
  async quantityEdit(params) {
    let result = null; // TSDB에서 현재 호기 생산 Count 값
    let nowQuantity = null; // 재료/완성품 재고 quantity 값
    let quantity = null; // 기존 재고 + (-1*사용한 재료 or 생산한 완성품) 값
    let newResult = null; // 재료/완성품 재고 update 결과

    const newParams = {
      ...params,
      // 3호기에서 글자 3을 발췌
      machineCode: params.machineCode.substring(0, 1),
    };

    // TSDB에서 현재 호기 생산 Count select
    try {
      result = await tsEdukitDao.selectCount(newParams);
      logger.debug(`(itemService.quantityEdit.tsdb) ${JSON.stringify(result)}`);
      console.log('result', result);
    } catch (err) {
      logger.error(`(itemService.quantityEdit.tsdb) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 현재 재료/완성품 개수 확인
    try {
      nowQuantity = await itemDao.selectQuantity(params);
      logger.debug(`(itemService.quantityEdit.rdb) ${JSON.stringify(nowQuantity)}`);
    } catch (err) {
      logger.error(`(itemService.quantityEdit.rdb) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 사용한 '재료'면 재고에서 빼고,
    // 생산한 '완성품'이면 재고에서 더한다.
    if (nowQuantity.itemId === '재료') {
      result[0][`No${newParams.machineCode}Count`] *= -1;
    }
    quantity = nowQuantity.dataValues.quantity + result[0][`No${newParams.machineCode}Count`];

    const itemInfo = {
      name: params.name,
      quantity,
    };

    try {
      newResult = await itemDao.updateItemQuantity(itemInfo);
      logger.debug(`(itemService.quantityEdit.rdb) ${JSON.stringify(newResult)}`);
    } catch (err) {
      logger.error(`(itemService.quantityEdit.rdb) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    console.log('newResult', newResult);
    return new Promise((resolve) => {
      resolve(newResult);
    });
  },
  // 재료 등록
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
  // 특정 재료 조회
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

  // 특정 재료 수정
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

  // 특정 재료 삭제
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
