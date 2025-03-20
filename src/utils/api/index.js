import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

const service = async ({url, method, data}) => {
  return await axios({
    url,
    method,
    data,
  })
    .then(res => {
      return {
        error: false,
        message: 'Fetch Success',
        data: res.data,
      };
    })
    .catch(error => {
      return {
        error: true,
        message: error.response.data.message,
        data: null,
      };
    });
};

export const getData = async (letter, word) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  try {
    await delay(10);

    return await service({
      url: `${API_URL}/${letter}/${word}.json`,
      method: 'GET',
      data: null,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
