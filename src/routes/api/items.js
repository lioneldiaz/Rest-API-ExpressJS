const express = require('express')
const helpers = require('../../util/helpers')
const router = express.Router()

/**
 * @description Item model
 */
const Item = require('../../model/item')

/**
 * @description Get all items
 * @Route GET api/items
 * @access Public
 */
router.get('/', (req, res) => {
  Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

/**
 * @description Create a Item
 * @Route POST api/items
 * @access Public
 */
router.post('/', (req, res) => {
  const { error } = helpers.validateItem(req.body)
  if (error != null) {
    /**
     * @description 400 Bad Request
     */
    return res.status(400).send(error.details[0].message)
  }
  const newItem = new Item({
    name: req.body.name,
    type: req.body.type
  })

  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.json(err))
})

/**
 * @description Update a item
 * @Route PUT api/items/:id
 * @access Public
 */
router.put('/:id', (req, res) => {
  Item.findById(req.params.id, (error, item) => {
    if (error) return res.status(404).json(error)

    item.name = req.body.name
    item.type = req.body.type

    item.save((error, updatedItem) => {
      if (error) return res.json({success: false})
      res.json(updatedItem)
    })
  })
})

/**
 * @description Delete a Item
 * @Route DELETE api/items/:id
 * @access Public
 */
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
})

module.exports = router