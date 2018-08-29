const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const items = require('./src/routes/api/items')

const app = express()
app.use(cors())

/**
 * @description BodyParser middleware
 */
app.use(bodyParse.json())

/**
 * @description DB config
 */
const db = require('./src/config/keys').mongoURI

/**
 * @description Connect to mongo
 */
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connect...'))
  .catch(err => console.log(err))

/**
 * @description Use routes
 */
app.use('/api/items', items)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listen on port ${port}`))