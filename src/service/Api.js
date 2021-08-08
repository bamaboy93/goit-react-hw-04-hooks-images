import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const Api = {
  getImages({ query, page, perPage }) {
    return axios
      .get(
        `/?q=${query}&key=20823750-0b59b5ef6ebc149bfc71c9c45&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
      )
      .then(res => res.data.hits);
  },
};
export default Api;
