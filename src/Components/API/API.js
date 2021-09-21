const key = "22652626-da7dc8e3a4ffdfdaea60a5cb5";
const defaultUrl = "https://pixabay.com/api/";

function fetchFirstArr(nextFieldvalue, page) {
  return fetch(
    `${defaultUrl}?q=${nextFieldvalue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response) {
      return response.json();
    }

    return console.log(`Нету данных о ${nextFieldvalue}`);
  });
}

const api = {
  fetchFirstArr,
};

export default api;

// .then((res) => res.json());
// Promise.reject(new Error (`Нету данных с ${nextFieldvalue}`));

// (response) => {
//   if (response.status.ok) {
//     return response.json();
//   }
// return console.log(`Нету данных о ${nextFieldvalue}`);
// }
