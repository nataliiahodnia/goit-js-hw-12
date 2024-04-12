// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api.js';
import { creategalleryMarkup } from './js/render-functions.js';

const list = document.querySelector('.gallery');
const form = document.querySelector('.js-form');
const loader = document.querySelector('.loader');
const gallery = new SimpleLightbox('.gallery a');

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hiddeLoader() {
  loader.classList.add('is-hidden');
}

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.search.value.trim();
  showLoader();
  list.innerHTML = '';

  getPhotos(searchQuery)
    .then(res => {
      if (res.hits.length === 0) {
        return iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      list.innerHTML = creategalleryMarkup(res.hits);
      gallery.refresh();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      hiddeLoader();
    });
}
