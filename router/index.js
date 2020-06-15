const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const bookRouter = require('./book')
const jwtAuth = require('./jwt')
const Result = require('../models/Result')

// 注册路由
const router = express.Router()

router.use(jwtAuth) // 添加jwt验证中间件

router.get('/', (req, res) => {
  res.send('hello node')
})

router.use('/user', userRouter)
router.use('/book', bookRouter)

router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

/**
 * 自定义路由异常处理中间件
 注意：
 1. 方法的参数不能少
 2. 方法必须放在路由最后
 */
router.use((err, req, res, next) => {
  debug && console.log(err)
  if (err && err.name && err.name === 'UnauthorizedError') {
    // token错误
    const { status = 401, message } = err
    new Result(null, 'Token验证失败', {
      error: status,
      errMsg: message
    }).tokenError(res.status(status)) // 更改res的状态码后res传给tokenError
  } else {
    // 其他错误
    const msg = (err && err.msg) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500
    const errorMsg = (err.output && err.output.payload && err.output.payload.message) || err.msg
    new Result(null, msg, {
      error: statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})

module.exports = router
