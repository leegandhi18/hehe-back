const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const tokenUtil = require('../lib/tokenUtil');
const userService = require('../service/userService');

router.post('/token', async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      password: req.body.password,
    };
    logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

    if (!params.name || !params.password) {
      const err = new Error('Not allowed null (name, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const token = tokenUtil.makeToken(result);
    res.set('token', token); // header 세팅

    // 최종 응답
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
