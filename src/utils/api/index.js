import axios from 'axios';

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
  try {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    await delay(100);
    return await service({
      url: `${process.env.API_URL}/${letter.toUpperCase()}/${word}.json`,
      method: 'GET',
      data: null,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
