const express = require('express')
const Result = require('../models/Result')
const { login, findUser } = require('../services/user')
const { md5, decoded } = require('../utils/index')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const boom = require('boom')
const jwt = require('jsonwebtoken')

router.post('/login',
  [
    body('username').isString().withMessage('用户名必须为字符串'),
    body('password').isString().withMessage('密码必须为字符串')
  ],
  function (req, res, next) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const [{ msg }] = err.errors;  // 通过两次解构拿到err.errors[0].msg
      next(boom.badRequest(msg));  // 传给下一个中间件
      return;
    }
    let { username, password } = req.body;
    password = md5(`${password}${PWD_SALT}`);
    login(username, password).then(user => {
      if (!user || user.length === 0) new Result('用户名或密码错误').fail(res);
      else {
        const [_user] = user; // user[0]
        // 生成token
        const token = jwt.sign(
          { username },
          PRIVATE_KEY,
          { expiresIn: JWT_EXPIRED }
        )
        // 将token返回给前端
        new Result({ token }, '登录成功').success(res);
      }
    })
  })

router.get('/info', function (req, res, next) {
  const decode = decoded(req)
  // console.log("解析完token后", decode)
  if(decode && decode.username) {
    findUser(decode.username)
    .then(user => {
      if(user) {
        user.roles = [user.role]
        new Result(user, '用户信息查询成功').success(res)
      } else {
        new Result('用户信息查询失败').fail(res)
      }
    })
  } else {
    new Result('用户信息查询失败').fail(res)
  }
})

module.exports = router
