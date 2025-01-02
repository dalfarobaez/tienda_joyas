const express = require('express')
const joyasRouter = require('../routes/joyas.routes')

const app = express()

app.use('/joyas',joyasRouter)

module.exports = app;