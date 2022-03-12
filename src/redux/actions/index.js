import fetchToken from '../../services/fetchToken';
import fetchQuestionsAndAnswers from '../../services/fetchQuestionsAndAnswers';
import { saveInLocalStorage } from '../../services/localStorage';
import randomizeQuestions from '../../helpers.js/randomizeQuestions';

export const TEN = 10;
export const SET_SCORE = 'SET_SCORE';
export const SET_USER = 'SET_USER';
export const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN';
export const SAVE_RESULTS = 'SAVE_RESULTS';
export const CHOICES_EXPIRED = 'CHOICES_EXPIRED';

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
  const THREE = 3;
  const requestAPI = await fetchQuestionsAndAnswers(token);
  if (requestAPI.response_code === THREE) {
    const newToken = await fetchToken();
    dispatch(fetchQuestionsAndAnswersThunk(newToken));
  }
  if (requestAPI.response_code === 0) {
    const questions = requestAPI.results.map((question) => ({
      difficulty: question.difficulty,
      question: question.question,
      category: question.category,
      correctAnswer: [{ correctness: true, content: question.correct_answer }],
      incorrectAnswers: question.incorrect_answers.map((incorrectElement, index) => ({
        correctness: false,
        content: incorrectElement,
        index,
      })),
    }));
    const randomizedQuestions = randomizeQuestions(questions);

    dispatch(saveResults(randomizedQuestions));
  }
  return requestAPI;
};

export const expireChoices = (hasExpired) => ({
  type: CHOICES_EXPIRED,
  payload: hasExpired,
});

export const setScore = (timeInSec, dificulty) => ({
  type: SET_SCORE,
  payload: TEN + (timeInSec * dificulty),
});
