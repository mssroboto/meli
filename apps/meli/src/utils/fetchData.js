export const fetchData = async (url, params) => fetch(`${url}${encodeURI(params)}`)
  .then((response) => response.json());
