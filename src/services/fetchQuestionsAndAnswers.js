const fetchQuestionsAndAnswers = async (token) => {
  try {
    const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await resolve.json();
    return response;
  } catch (error) {
    return error;
  }
};

export default fetchQuestionsAndAnswers;
