const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('./constant')

/**
 *判断是否为对象
 *
 * @param {*} o
 * @returns
 */
function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]'
}

/**
 * md5密码加密
 *
 * @param {*} s
 * @returns
 */
function md5(s) {
    // s为字符串
    return crypto.createHash('md5').update(String(s)).digest('hex');
}

/**
 *解析token
 *
 * @param {object} req
 * @returns
 */
function decoded(req) {
    let token = req.get('Authorization')
    if (token.indexOf('Bearer') === 0) {
        token = token.replace('Bearer ', '')
    }
    return jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
    isObject,
    md5,
    decoded
}