import axios from 'axios';
import * as url from 'url';
import * as querystring from 'querystring';

/**
 * Algorithm to count the occurences.
 * @param {!array} arr
 * @param {!string} val
 */
const countOccurrences = (arr, val) => {
  const instances = arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  return { category: val, instances };
};

/**
 * Gets all the categories based on an item.
 * @param {!Object} data The data object.
 */
const getCategories = (data) => {
  const allCategories = data.results.map((item) => item.category_id);
  const categoryOccurrences = allCategories.map(item => countOccurrences(allCategories, item));

  const unique = [];
  categoryOccurrences.map((x) =>
    unique.filter(
      (a) => (a.category == x.category && a.instances == x.instances)
    ).length > 0
    ? null
    : unique.push(x)
  );

  return unique.sort((item, b) => (item.instances < b.instances) ? 1 : -1);
};

/**
 * Gets a single item data.
 * @param {Object} req the request object.
 * @param {Object} res the response object.
 */
const getItem = async(req, res) => {
  const id = req.params;

  const data = await axios
    .all([
      axios({
        method: 'get',
        url:`https://api.mercadolibre.com/items/${id.item}`
      }),
      axios({
        method: 'get',
        url:`https://api.mercadolibre.com/items/${id.item}/description`
      }),
    ])
    .then((response) => {
      const [itemReq, descriptionReq] = response || [];

      return {
        author: {
          name: 'Samanta',
          lastname: 'Martínez'
        },
        item: {
          id: itemReq.data.id,
          title: itemReq.data.title,
          price: {
            currency: itemReq.data.currency_id,
            amount: itemReq.data.price,
            decimals: 0,
          },
          picture: itemReq.data.pictures[0].url,
          category: itemReq.data.category_id,
          condition: itemReq.data.condition,
          free_shipping: itemReq.data.shipping.free_shipping,
          soldQuantity: itemReq.data.sold_quantity,
          description: descriptionReq.data.plain_text
        }
      }
    })
    .catch((e) => { console.log(e.message); });

  return res.json(data);
};

/**
 * Gets all the items data.
 * @param {Object} req the request object.
 * @param {Object} res the response object.
 */
const getItems = async(req, res) => {
  const URL = url.URL;
  const hostname = "127.0.0.1";
  const parsedUrl = new URL(`http://${hostname}/${req.originalUrl}`);
  const parsedQs = querystring.parse(parsedUrl.search.substring(1));
  const { q } = parsedQs;

  const data = await axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
    .then((response) => response.data)
    .catch((e) => { console.log(e); });

  const categories = getCategories(data);

  const mappedItems = data.results.map((item) => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: 0,
    },
    picture: item.thumbnail,
    condition: item.condition,
    location: item.address.state_name,
    freeShipping: item.shipping.free_shipping
  }));

  return res.json({
    author: {
      name: 'Samanta',
      lastname: 'Martínez'
    },
    categories,
    items: mappedItems
  });
};

/**
 * Gets the category data.
 * @param {Object} req the request object.
 * @param {Object} res the response object.
 */
const getCategory = async(req, res) => {
  const id = req.params;

  const data = await axios
    .get(`https://api.mercadolibre.com/categories/${id.item}`)
    .then((response) => response.data)
    .catch((e) => { console.log(e); });

  return res.json(data);
};

/**
 * Creates the API specific routes that will be consumed in the front end.
 * @param {!Object} app the express app.
 */
export function createMeliApi(app) {
  app.get('/api', (req, res) => res.send({message: 'Welcome to the ML api'}));
  app.route('/api/items').get(getItems);
  app.route('/api/items/:item').get(getItem);
  app.route('/api/categories/:item').get(getCategory);
}
