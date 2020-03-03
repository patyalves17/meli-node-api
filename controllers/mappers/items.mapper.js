const itemsMapper = data => {
  return {
    autor: {
      name: 'Patricia',
      lastname: 'Almeida'
    },
    categories: generateCategories(data),
    items: generateItems(data)
  };
};

const generateCategories = ({ filters }) => {
  if (
    filters &&
    filters.length > 0 &&
    filters[0].values &&
    filters[0].values.length > 0
  ) {
    return filters[0].values[0]['path_from_root'].map(
      category => category.name
    );
  } else {
    return ['Outros'];
  }
};

const generateItems = ({ results }) => {
  return results.map(item => {
    return generateItem(item);
  });
};

const generateItem = (item, description, genereteAuthor) => {
  let data = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.available_quantity,
      decimals: item.price
    },
    picture: item.pictures ? item.pictures[0].url : item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity
  };

  if (item.address) {
    data.address = {
      state_name: item.address.state_name,
      city_name: item.address.city_name
    };
  }
  if (item.seller_address) {
    data.address = {
      state_name: item.seller_address.state.name,
      city_name: item.seller_address.city.name
    };
  }

  if (description) {
    let descriptions = '';
    description.map(desc => {
      descriptions += desc.plain_text;
    });

    data.description = descriptions;
  }
  if (genereteAuthor) {
    return {
      author: {
        name: 'Patricia',
        lastname: 'Almeida'
      },
      item: { ...data }
    };
  }

  return data;
};

module.exports = { itemsMapper, generateItem };
