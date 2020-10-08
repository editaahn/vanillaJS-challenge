import { renderMoviesList } from './lib/renderMoviesList.js'
import { seatsContainer } from './seatsContainer.js'

const App = (store) => {

  const request = fetch("/getmovies", {
    headers: { Accept: "application/json" },
    method: "GET",
  });
  request
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        return Promise.reject(new Error("response failed"));
      }
    })
    .then(movies => {
      renderMoviesList(movies.movies_list, document.getElementById('movieSelector'));
      store.push(...movies.movies_list);
      return new seatsContainer(store);
    })
    .then(seats => {
      document.querySelector('.seatsContainer').appendChild(seats.container)
    }) 
    .catch((error) => console.log(error));

};

export default App;