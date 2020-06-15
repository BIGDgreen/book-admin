const { querySql, queryOne } = require('../db')

function login(username, password) {
    return querySql(`select * from admin_user where username='${username}' and password='${password}'`)
}

/**
 *通过用户名查询
 *
 * @param {string} username
 * @returns
 */
function findUser(username) {
    return queryOne(`select avatar, id, nickname, role, username from admin_user where username='${username}'`)
}

module.exports = {
    login,
    findUser
}