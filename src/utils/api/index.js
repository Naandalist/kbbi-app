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

export const getData = async (text) => {
  return service({
    url: `${API_URL}/entri/${text}`,
    method: 'GET',
    data: null,
  });
};
