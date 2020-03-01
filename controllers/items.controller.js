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
  const requestDetails = axios.get(
    `https://api.mercadolibre.com/items/${req.params.id}`
  );
  const requestDescriptions = axios.get(
    `https://api.mercadolibre.com/items/${req.params.id}/descriptions`
  );

  axios
    .all([requestDetails, requestDescriptions])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const item = generateItem(responseOne.data, responseTwo.data, true);
        res.send(item);
      })
    )
    .catch(errors => {
      res.status(500).send(error);
    });
};
