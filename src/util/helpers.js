const joi = require('joi')

/**
 * @description To validate data of the item
 * @param {Object} item object
 */
function validateItem (item) {
  const schema = {
    name: joi.string().min(2).required(),
    type: joi.string().min(1).required()
  }
  return joi.validate(item, schema)
}

module.exports = {
  validateItem
}