const { env } = require('./env')
const UPLOAD_PATH = env === 'dev' ? '/Projects/nginxFile/admin-upload-ebook' : // 上传后的文件保存的nginx路径
  '/root/upload/admin-upload-ebook'
const UPLOAD_URL = env === 'dev' ? 'http://www.bigdgreen.com:90/nginxFile/admin-upload-ebook' :
  'http://47.115.35.86:90/nginxFile/admin-upload-ebook'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2,   // token过期
  debug: true,    // 为true时，会打印错误日志和请求结果
  PWD_SALT: 'admin_imooc_node',   // 密码加密的盐值
  PRIVATE_KEY: 'admin_bigdgreen_test_abc',
  JWT_EXPIRED: 7 * 24 * 60 * 60,  // token失效时间 单位：s
  UPLOAD_PATH,
  UPLOAD_URL,
  MIME_TYPE_EPUB: 'application/epub+zip'
}