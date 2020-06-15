const express = require('express')
const router = require('./router/index.js')
const app = new express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { debug } = require('./utils/constant')
global.debug = debug

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)

const server = app.listen(5000, () => {
  const { address, port } = server.address()
  console.log(`HTTP服务启动成功：http://${address}:${port}`)
})
