import axios from 'axios';

export async function getPhotos(query, page, pageSize) {
  const API_KEY = '43339285-ea15b1a3e45dc18314900d076';
  const url = 'https://pixabay.com/api/';

  // const params = new URLSearchParams({
  //   key: API_KEY,
  //   q: query,
  //   orientation: 'horizontal',
  //   image_type: 'photo',
  //   safesearch: true,
  //   page,
  //   per_page: 15,
  // });

  const params = {
    key: API_KEY,
    q: query,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
    page,
    per_page: pageSize,
  };

  try {
    const response = await axios.get(url, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
