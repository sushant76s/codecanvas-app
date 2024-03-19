import Interceptor from "./Interceptor";

export const getLanguages = async () => {
  try {
    const response = await Interceptor.get("/languages");
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const submitCode = async (data) => {
  try {
    const response = await Interceptor.post("/submit_code", data);
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

export const getSubmission = async (token) => {
  try {
    const response = await Interceptor.get(`/submit_code/${token}`);
    // console.log("Response in Api: ", response);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};
