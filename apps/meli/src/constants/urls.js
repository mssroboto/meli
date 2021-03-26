export const API_URL = 'http://localhost:3333/api';

export const URLS = {
  product: '/items/:productId',
  results: '/items',
  root: '/',
  search: '/items?search=',
  resultsQuery: `${API_URL}/items?q=`,
  categoriesQuery: `${API_URL}/categories/`,
  itemsQuery: `${API_URL}/items/`
}
