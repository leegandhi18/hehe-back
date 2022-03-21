const { sequelize } = require('./connection');
const EmoHistory = require('./emoHistory');
const Item = require('./item');
const Machine = require('./machine');
const MachineHistory = require('./machineHistory');
const Management = require('./management');
const Order = require('./order');
const User = require('./user');

const db = {};

db.sequelize = sequelize;

// model 생성
db.EmoHistory = EmoHistory;
db.Item = Item;
db.Machine = Machine;
db.MachineHistory = MachineHistory;
db.Management = Management;
db.Order = Order;
db.User = User;

// model init
// EmoHistory.init(sequelize);
// Item.init(sequelize);
// Machine.init(sequelize);
// MachineHistory.init(sequelize);
// Management.init(sequelize);
// Order.init(sequelize);
User.init(sequelize);

module.exports = db;
