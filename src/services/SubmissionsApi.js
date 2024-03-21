import Interceptor from './Interceptor';

export const getData = async () => {
  try {
    const response = await Interceptor.get('/data');
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const postData = async (formData) => {
    try {
      const response = await Interceptor.post('/data', formData);
      return response;
    } catch (error) {
      console.error(error);
    }
    return null;
  };