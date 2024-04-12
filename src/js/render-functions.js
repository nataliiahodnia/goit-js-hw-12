export function creategalleryMarkup(images) {
  return images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}">
      </a>
      <div class="image-details">
        <ul>
         <li>
           <h3>Likes:</h3>
           <p>${image.likes}</p>
         </li>
         <li>
           <h3>Views:</h3>
           <p>${image.views}</p>
         </li>  
         <li>
           <h3>Comments:</h3>
           <p>${image.comments}</p>
         </li>  
         <li>
           <h3>Downloads:</h3>
           <p>${image.downloads}</p>
         </li>
        </ul>
      </div>
    </li>
  `
    )
    .join('');
}
