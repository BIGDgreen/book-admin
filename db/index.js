const mysql = require('mysql')
const config = require('./config')
const { isObject } = require('../utils/index');
const { reject, result } = require('lodash');

function connect() {
    const { host, user, password, database } = config;
    return mysql.createConnection({
        host,
        user,
        password,
        database,
        multipleStatements: true
    })
}

/**
 *数据库查询
 *
 * @param {string} sql
 * @returns
 */
function querySql(sql) {
    const conn = connect();
    debug && console.log("正在执行的sql语句：", sql);
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    debug && console.log("查询数据库发生错误", err);
                    reject(err)
                } else {
                    // debug && console.log("数据库查询结果：", results);
                    resolve(results)
                }
            })
        } catch (e) {
            reject(e)
        } finally {
            conn.end()  // 释放连接
        }
    })
}

/**
 *查找一条信息
 *
 * @param {*} sql
 * @returns {Promise}
 */
function queryOne(sql) {
    return new Promise((resolve, reject) => {
        querySql(sql)
            .then(results => {
                if (results && results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve(null)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 *将对象插入tableName中
 *
 * @param {object} model
 * @param {string} tableName
 * @returns
 */
function insert(model, tableName) {
    return new Promise((resolve, reject) => {
        // debug && console.log('插入的对象', model)
        if (!isObject(model)) {
            reject(new Error('插入数据库失败，插入数据非对象'))
        } else {
            let keys = []
            let values = []
            Object.keys(model).forEach(key => {
                if (model.hasOwnProperty(key)) { // key为model自身的属性，而非原型链上继承的
                    keys.push(`\`${key}\``) // push的实际内容为`key`，加上反引号避免key被识别为关键字
                    values.push(`'${model[key]}'`)
                }
            })
            if (keys.length > 0 && values.length > 0) {
                const keysString = keys.join(',')
                const valuesString = values.join(',')
                let sql = `insert into ${tableName}(${keysString}) values (${valuesString})`
                // debug && console.log(sql)
                const conn = connect()
                try {
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            // console.log('插入成功', result)
                            resolve()
                        }
                    })
                } catch (err) {
                    reject(err)
                } finally {
                    conn.end()
                }
            } else {
                reject(new Error('插入数据库失败，对象中没有任何属性'))
            }
        }
    })
}

function update(model, tableName, fileName) {
    return new Promise((resolve, reject) => {
        if (!isObject(model)) {
            reject(new Error('更新数据库失败，更新数据非对象'))
        } else {
            const entry = []
            Object.keys(model).forEach(key => {
                if (model.hasOwnProperty(key)) {
                    entry.push(`\`${key}\`='${model[key]}'`)
                }
            })
            if (entry.length > 0) {
                const sql = `update \`${tableName}\` set ${entry.join(',')} where fileName='${fileName}'`
                debug && console.log(sql)
                const conn = connect()
                try {
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    })
                } catch (e) {
                    reject(e)
                } finally {
                    conn.end()
                }
            }
        }
    })
}

function and(where, key, value) {
    return where === 'where' ?
        `${where} \`${key}\`='${value}'` :
        `${where} and \`${key}\`='${value}'`
}

function andLike(where, key, value) {
    return where === 'where' ?
        `${where} \`${key}\` like '%${value}%'` :
        `${where} and \`${key}\` like '%${value}%'`
}

module.exports = {
    querySql,
    queryOne,
    insert,
    update,
    and,
    andLike
}
