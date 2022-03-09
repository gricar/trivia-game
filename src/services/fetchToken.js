const URL = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  try {
    const resolve = await fetch(URL);
    const data = await resolve.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchToken;
