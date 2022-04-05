const dotenv = require('dotenv');

dotenv.config();

const influxConfig = {
  host: process.env.TSDB_HOST || '',
  port: process.env.TSDB_PORT || '',
  database: process.env.TSDB_DATABASE || '',
};

module.exports = influxConfig;
