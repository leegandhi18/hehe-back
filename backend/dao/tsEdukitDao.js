const { TsEdukit } = require('../models/index');

const TsEdukitQuery = new TsEdukit();
TsEdukitQuery.useDatabase();

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
      TsEdukitQuery.writePoints([
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
