// function fetchPhotos(input, limit, page) {

//   const apiKey = "2517208-093ee8e26dcc8dc903fe58900";

//   const params = new URLSearchParams({
//     key: apiKey,
//     q: input,
//     per_page: limit,
//     page: page,
//     image_type: "photo",
//     orientation: "horizontal",
//     safesearch: "true"
//   });

//   const fetchQuery =
//     fetch(`https://pixabay.com/api/?${params}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });

//   return fetchQuery;
// }
// export { fetchPhotos };

// https://pixabay.com/api/?key=2517208-093ee8e26dcc8dc903fe58900&q=yellow+flowers&image_type=photo&pretty=true


