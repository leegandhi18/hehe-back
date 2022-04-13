const now = require('performance-now');
const logger = require('./logger');

const mqttUtil = {
  mqttSubscribe(topic, message) {
    return new Promise((resolve, reject) => {
      try {
        /*
        // for방식 //
        const start2 = now();
        console.log(start2.toFixed(3));
        // for 방식, forEach 방식과 대조하여 처리 속도 차이를 알고 싶다.
        const keys = [];
        const values = [];
        const processedPlcData = {};

        for (let i = 0; i < JSON.parse(message).Wrapper.length; i += 1) {
          keys[i] = JSON.parse(message).Wrapper[i].name;
          values[i] = JSON.parse(message).Wrapper[i].value;
          console.log(i, JSON.parse(message).Wrapper.length, keys[i], values[i]);
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
              [keys[i]]: Number(values[i]),
            };
          }
        }
        const end2 = now();
        console.log(end2.toFixed(3)); // the number of milliseconds the current node process is running
        console.log('for 성능테스트: ', end2.toFixed(3) - start2.toFixed(3));
        console.log('for 성능테스트: ', (end2 - start2).toFixed(3), '밀리초');
*/

        // forEach방식 //
        const start1 = now();
        console.log(start1.toFixed(3));
        const influxparams = {
          measurement: topic,
          tags: {},
          fields: {},
          timestamp: '',
        };
        const receivedData = JSON.parse(message).Wrapper;
        // console.log('message: ', JSON.parse(message).Wrapper);

        receivedData.forEach((e) => {
          if (e.name !== 'DataTime') {
            influxparams.fields = { ...influxparams.fields, [e.name]: Number(e.value) };
          } else {
            influxparams.tags = { ...influxparams.tags, [e.name]: e.value };
          }
        });
        // console.log(influxparams.tags, influxparams.fields);

        const end1 = now();
        console.log(end1.toFixed(3)); // the number of milliseconds the current node process is running
        console.log('forEach 성능테스트: ', end1.toFixed(3) - start1.toFixed(3));
        console.log('forEach 성능테스트: ', (end1 - start1).toFixed(3), '밀리초');

        resolve(influxparams); // forEach 방식
        // resolve(processedPlcData); // for 방식
      } catch (err) {
        reject(err);
      }
    });
  },
};

module.exports = mqttUtil;
