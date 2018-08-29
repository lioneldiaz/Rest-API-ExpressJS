const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * @description Create schema
 */
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Item = mongoose.model('item', ItemSchema)