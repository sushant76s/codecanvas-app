import Interceptor from './Interceptor';

export const getLanguages = async () => {
  try {
    const response = await Interceptor.get('/languages');
    // console.log("Response in Api: ", response);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};