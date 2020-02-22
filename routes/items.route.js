const express = require('express');
const router = express.Router();
const items_controller = require('../controllers/items.controller');

// get items
router.get('/', items_controller.items_all);

// find item by id
router.get('/:id', items_controller.item_details);

module.exports = router;
