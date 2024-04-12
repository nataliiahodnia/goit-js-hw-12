export function getPhotos(query) {
  const API_KEY = '43339285-ea15b1a3e45dc18314900d076';
  const baseUrl = 'https://pixabay.com/api/';
  // const endPoint = "/search/photos";

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
  });

  // return fetch(`${baseUrl}${endPoint}?${params}`).then((res) => {
  return fetch(`${baseUrl}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
