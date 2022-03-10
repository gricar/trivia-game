import fetchToken from '../../services/fetchToken';
import { saveInLocalStorage } from '../../services/localStorage';

export const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN';

const saveToken = (userToken) => ({
  type: SAVE_USER_TOKEN,
  userToken,
});

const fetchTokenThunk = () => async (dispatch) => {
  const userToken = await fetchToken();
  dispatch(saveToken(userToken));
  saveInLocalStorage(userToken);
};

export default fetchTokenThunk;
