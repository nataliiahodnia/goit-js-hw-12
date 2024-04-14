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
    iziToast.info({
      // position: 'topRigh',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
};

const resetPagination = () => {
  currentQuery = null;
  currentPage = 1;
  totalHits = 0;
};

const onSubmit = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.search.value.trim();

  showLoader();
  hideLoadMoreButton();
  resetPagination();

  list.innerHTML = '';

  try {
    const result = await getPhotos(searchQuery, currentPage, pageSize);

    if (result.hits.length === 0) {
      return iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    list.innerHTML = createGalleryMarkup(result.hits);

    currentQuery = searchQuery;
    totalHits = result.totalHits;

    gallery.refresh();

    showLoadMoreButton();
  } catch (error) {
    console.log(error);
    hideLoadMoreButton();
  } finally {
    hideLoader();
  }
};

const loadMorePictures = async () => {
  if (!currentQuery) {
    return;
  }

  showLoader();
  hideLoadMoreButton();

  currentPage += 1;

  try {
    const result = await getPhotos(currentQuery, currentPage, pageSize);

    list.innerHTML += createGalleryMarkup(result.hits);

    gallery.refresh();

    const galeryItem = document.querySelector('.gallery-item');
    const galeryItemSize = galeryItem.getBoundingClientRect();

    window.scrollBy({
      top: galeryItemSize.height * 2,
      behavior: 'smooth',
    });

    showLoadMoreButton();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', onSubmit);

loadMoreButton.addEventListener('click', loadMorePictures);
