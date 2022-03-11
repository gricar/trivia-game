import fetchToken from '../../services/fetchToken';
import fetchQuestionsAndAnswers from '../../services/fetchQuestionsAndAnswers';
import { saveInLocalStorage } from '../../services/localStorage';

export const SET_USER = 'SET_USER';
export const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN';
export const SAVE_RESULTS = 'SAVE_RESULTS';
export const TIMER_EXPIRED = 'TIMER_EXPIRED';

export const saveToken = (userToken) => ({
  type: SAVE_USER_TOKEN,
  userToken,
});

export const fetchTokenThunk = () => async (dispatch) => {
  const userToken = await fetchToken();
  dispatch(saveToken(userToken));
  saveInLocalStorage(userToken);
  return userToken;
};

export const setUser = (name, email) => ({
  type: SET_USER,
  payload: {
    name,
    email,
  },
});

const saveResults = (results) => ({
  type: SAVE_RESULTS,
  payload: results,
});

export const fetchQuestionsAndAnswersThunk = (token) => async (dispatch) => {
  const THREE = 3; // NO MAGIC NUMBERS
  const requestAPI = await fetchQuestionsAndAnswers(token); // usa token salvo para buscar Q&As
  if (requestAPI.response_code === THREE) { // response_code = 3 significa token expirado
    const newToken = await fetchToken();
    dispatch(fetchQuestionsAndAnswersThunk(newToken)); // entao renova token e faz nova requisicao
  }
  if (requestAPI.response_code === 0) {
    const questions = requestAPI.results.map((question) => ({ // percorre o array vindo da requisicao
      question: question.question,
      category: question.category,
      correctAnswer: [{ correctness: true, content: question.correct_answer }],
      incorrectAnswers: question.incorrect_answers.map((incorrectElement, index) => ({
        correctness: false,
        content: incorrectElement,
        index,
      })), // montando novo objeto para facilitar manipulacao posterior, incluindo index incremental apenas para respostas incorretas.
    }));
    dispatch(saveResults(questions));
  }
  return requestAPI;
};

export const setTimerExpired = (hasExpired) => ({
  type: TIMER_EXPIRED,
  payload: hasExpired,
});
