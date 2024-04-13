// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api.js';
import { createGalleryMarkup } from './js/render-functions.js';

const pageSize = 15;

const list = document.querySelector('.gallery');
const form = document.querySelector('.js-form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.btn-load-more');
const gallery = new SimpleLightbox('.gallery a');

let currentQuery = null;
let currentPage = 1;
let totalHits = 0;

const hideLoader = () => loader.classList.add('hidden');
const showLoader = () => loader.classList.remove('hidden');

const hideLoadMoreButton = () => loadMoreButton.classList.add('hidden');
const showLoadMoreButton = () => {
  if (currentPage * pageSize < totalHits) {
    loadMoreButton.classList.remove('hidden');
  } else {
    list.innerHTML += "We're sorry, but you've reached the end of search results.";
  }
};

const resetPagination = () => {
  currentQuery = null;
  currentPage = 1;
  totalHits = 0;
};

const onSubmit = (event) => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.search.value.trim();
  
  showLoader();
  hideLoadMoreButton();
  resetPagination();

  list.innerHTML = '';

  getPhotos(searchQuery, currentPage, pageSize)
    .then(res => {
      if (res.hits.length === 0) {
        return iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      list.innerHTML = createGalleryMarkup(res.hits);

      currentQuery = searchQuery;
      totalHits = res.totalHits;

      gallery.refresh();
      
      showLoadMoreButton();
    })
    .catch(error => {
      console.log(error);
      
      hideLoadMoreButton();
    })
    .finally(() => {
      hideLoader();
    });
};

const loadMorePictures = () => {
  if (!currentQuery) {
    return;
  }

  showLoader();
  hideLoadMoreButton();

  currentPage += 1;

  getPhotos(currentQuery, currentPage, pageSize)
    .then(res => {
      list.innerHTML += createGalleryMarkup(res.hits);

      gallery.refresh();

      const galeryItem = document.querySelector('.gallery-item');
      const galeryItemSize = galeryItem.getBoundingClientRect();

      window.scrollBy({
        top: galeryItemSize.height * 2,
        behavior: 'smooth',
      });

      showLoadMoreButton();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
};

form.addEventListener('submit', onSubmit);

loadMoreButton.addEventListener('click', loadMorePictures);
