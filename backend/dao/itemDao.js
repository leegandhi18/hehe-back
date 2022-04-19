const Sequelize = require('sequelize');
const { Item } = require('../models/index');

// const { Op } = Sequelize;

const dao = {
  selectList() {
    const setQuery = {};
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Item.findAndCountAll({
        ...setQuery,
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectQuantity(params) {
    return new Promise((resolve, reject) => {
      Item.findOne({
        where: { name: params.name },
        attributes: ['quantity', 'itemId'],
      }).then((selectList) => {
        resolve(selectList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  updateItemQuantity(params) {
    return new Promise((resolve, reject) => {
      Item.update(
        {
          quantity: params.quantity,
        },
        {
          where: { name: params.name },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 서브쿼리 연습해야함
  // updateItemQuantity(params) {
  //   return new Promise((resolve, reject) => {
  //     let B = null;
  //     const A = new Promise((res, rej) => {
  //       Item.findOne({
  //         where: { name: params.name },
  //         attributes: ['quantity'],
  //       }).then((call) => {
  //         setTimeout(() => {
  //           B = call.dataValues.quantity - params.quantity;
  //         }, 2000);
  //       });
  //     });
  //     console.log('B: ', B);
  //     Item.update(
  //       {
  //         quantity: B,
  //       },
  //       {
  //         where: { name: params.name },
  //       },
  //     ).then((selectList) => {
  //       resolve(selectList);
  //     }).catch((err) => {
  //       reject(err);
  //     });
  //   });
  // },
  insert(params) {
    return new Promise((resolve, reject) => {
      Item.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Item.findByPk(params.id).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      Item.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  delete(params) {
    return new Promise((resolve, reject) => {
      Item.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
