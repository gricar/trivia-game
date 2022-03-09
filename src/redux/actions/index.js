import fetchToken from '../../services/fetchToken';

const SAVE_TOKEN = 'SAVE_TOKEN';

const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

const fetchTokenThunk = () => async (dispatch) => {
  const response = await fetchToken();
  dispatch(saveToken(response.token));
};

export default fetchTokenThunk;
