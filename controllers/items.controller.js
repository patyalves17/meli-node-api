// import { itemsMapper } from './mappers/items.mapper.js';
const { itemsMapper, generateItem } = require('./mappers/items.mapper');
const axios = require('axios');

exports.items_all = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
    );
    const items = itemsMapper(response.data);
    // res.send(response.data);
    res.send(items);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.item_details = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const item = generateItem(response.data, true);
    res.send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
