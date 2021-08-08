import axios from 'axios';

const KEY = '18977229-7092af5d4460397c12f37767a';
const BASE_URL = `https://pixabay.com/api/`;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const fetchImages = async (searchQuery, page) => {
  try {
    const { data } = await axios.get('', {
      params: { q: searchQuery, page },
    });
    return data.hits;
  } catch (error) {
    console.log('error', { error });
    return [];
  }
};
const Api = {
  fetchImages,
};

export default Api;