import axios from 'axios';

export async function getPhotos(query,page) {
  const API_KEY = '43339285-ea15b1a3e45dc18314900d076';
  const baseUrl = 'https://pixabay.com/api/';
  // const endPoint = "/search/photos";

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
    page,
    per_page: 15,
  });

  // return fetch(`${baseUrl}?${params}`).then(res => {
  //   if (!res.ok) {
  //     throw new Error(res.status);
  //   }
  //   return res.json();
  // });

  try {
    const response = await axios.get(`${baseUrl}?${params}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
  
}

