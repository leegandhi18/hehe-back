const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      name: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(300),
      },
      role: {
        type: Sequelize.INTEGER(2),
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

  static associate(db) {
    db.UserOrder.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
    db.UserOrder.hasMany(db.UserOrderDetail, { foreignKey: 'orderNumber', sourceKey: 'orderNumber' });
  }
};
