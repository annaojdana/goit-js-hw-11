import './css/styles.css';
import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


// QuerySelectors
const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const btnMore = document.querySelector(".load-more")
const { searchQuery } = searchForm.elements;

// Listening for the submit

searchForm.addEventListener("submit", searching);
btnMore.addEventListener("click", nextPage);
// Controls the group number
let page = 1;
// Controls the number of items in the group
let limit = 40;


// Functions
function searching(event) {
  event.preventDefault();
  console.log(searchQuery.value);
  page = 1;
  getPhotos(searchQuery.value, limit, page)
    .then(photos => {
      renderPhotosInfo(photos);
    }
    )
    .catch(error => {
     console.log(error);
    }
  );

};

function nextPage() {

  console.log("ok");
  page += 1;
  console.log(page);
   getPhotos(searchQuery.value, limit, page)
    .then(photos => {
      renderPhotosInfo(photos);
      const { height: cardHeight } = gallery
  .firstElementChild.getBoundingClientRect();
console.log(cardHeight);
 window.scrollTo({
  top: cardHeight/2,
  behavior: 'smooth',
});
    }
    )
    .catch(error => {
     console.log(error);
    })
}

function renderPhotosInfo({totalHits, hits}) {

  const totalPages = totalHits / limit;
  if (totalPages > 1) {
    btnMore.style.display = "block";
  };
 if (page === totalPages || (page>totalPages&&page<totalPages+1) ) {
    btnMore.style.display = "none";
  };
  console.log(totalPages);
    const markup = hits
      .map(({webformatURL, largeImageURL, tags, likes, views, comments,downloads}) => {
        return `<div class="photo-card">
   <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <br>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      <br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      <br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <br>${downloads}
    </p>
  </div>
</div>`;
      })
      .join("");

    gallery.innerHTML = markup;

const lightbox = new SimpleLightbox('.gallery__link');
};

async function getPhotos(input, limit, page) {
   const apiKey = "2517208-093ee8e26dcc8dc903fe58900";
  try {
    const response = await axios.get('https://pixabay.com/api/?${params}', {
      params: {
        key: apiKey,
        q: input,
        per_page: limit,
        page: page,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}