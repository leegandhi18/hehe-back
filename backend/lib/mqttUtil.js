const logger = require('./logger');

const mqttUtil = {
  mqttSubscribe(topic, message) {
    return new Promise((resolve, reject) => {
      try {
        const keys = [];
        const values = [];
        const processedPlcData = {};

        for (let i = 0; i < JSON.parse(message).Wrapper.length; i += 1) {
          keys[i] = JSON.parse(message).Wrapper[i].name;
          values[i] = JSON.parse(message).Wrapper[i].value;
        }

        for (let i = 0; i < keys.length; i += 1) {
          if (keys[i] === 'DataTime') {
            // tags 컬럼 분리 (DataTime)
            processedPlcData.tags = {
              [keys[i]]: values[i],
            };
          } else {
            processedPlcData.fields = {
              ...processedPlcData.fields,
              [keys[i]]: values[i],
            };
          }
        }

        resolve(processedPlcData);
      } catch (err) {
        reject(err);
      }
    });
  },
};

module.exports = mqttUtil;
