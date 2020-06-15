const expressJWT = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

module.exports = expressJWT({
    secret: PRIVATE_KEY,
    credentialsRequired: true
}).unless({     // 认证白名单
    path: [
        '/',
        '/user/login'
    ]
})
