const Sequelize = require('sequelize');

module.exports = class MachineHistory extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      itemName: {
        type: Sequelize.STRING(30),
      },
      totalQuantity: {
        type: Sequelize.INTEGER,
      },
      goodQuantity: {
        type: Sequelize.INTEGER,
      },
      badQuantity: {
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.DATE,
      },
      endTime: {
        type: Sequelize.DATE,
      },
      emoHistory: {
        type: Sequelize.DATE,
      },
      machineCode: {
        type: Sequelize.STRING(30),
      },
      name: {
        type: Sequelize.STRING(30),
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }
};
