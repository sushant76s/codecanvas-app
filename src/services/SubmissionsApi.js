import Interceptor from './Interceptor';

export const getData = async () => {
  try {
    const response = await Interceptor.get('/data');
    // console.log("Response in Api: ", response);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const postData = async (formData) => {
    try {
      const response = await Interceptor.post('/data', formData);
    //   console.log('post response: ', response);
      return response;

    //   if (response.status === 200) {
    //     const responseData = response.data; // Assuming your interceptor returns data property
    //     console.log("Response in Api: ", responseData);
    //     return responseData;
    //   } else {
    //     throw new Error('Failed to post data');
    //   }

    } catch (error) {
      console.error(error);
    }
    return null;
  };