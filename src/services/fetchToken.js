const URL = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  try {
    const resolve = await fetch(URL);
    const response = await resolve.json();
    return response.token;
  } catch (error) {
    return error;
  }
};

export default fetchToken;
