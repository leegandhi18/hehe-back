// const Sequelize = require('sequelize');
const Influx = require('influx');
const influxConfig = require('../config/corsConfig.json');

const influx = new Influx.InfluxDB(influxConfig);

const dao = {
  selectList() {
    return new Promise((resolve, reject) => {
      influx
        .query('select')
        .then((selectList) => {
          resolve(selectList);
        }).catch((err) => {
          reject(err);
        });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      influx.getDatabaseNames()
      // eslint-disable-next-line consistent-return
        .then((names) => {
          if (!names.includes('backend')) {
            console.log(`My database names are: ${names.join(', ')}`);
            console.log('there is no database, will be created new one');
            return influx.createDatabase('backend');
          }
        })
      /* .then(() => {
    http.createServer(app).listen(3000, () => {
      // console.log(`My database names are2: ${names.join(', ')}`);
      console.log('Listening on port 3000');
    });
  }) */
        .catch((err) => {
          console.error('Error creating Influx database!');
          console.log(({ err }));
        });
      influx.writePoints([
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
