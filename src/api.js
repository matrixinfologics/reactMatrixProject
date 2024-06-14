import axios from 'axios';

const BASE_PAGE_URL = 'http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/pages';
const BASE_POST_URL = 'http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/posts';

export const fetchPageData = async (slug) => {
  try {
    const response = await axios.get(`${BASE_PAGE_URL}/?slug=${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get(BASE_POST_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
