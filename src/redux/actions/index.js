import fetchToken from '../../services/fetchToken';

export const SAVE_TOKEN = 'SAVE_TOKEN';

const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

const fetchTokenThunk = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(saveToken(token));
};

export default fetchTokenThunk;
