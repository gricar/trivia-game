const randomizeQuestions = (questionsToBeRandomized) => {
  const ZERO_FIVE = 0.5;

  const questionsAndAnswers = questionsToBeRandomized.map((element) => ({
    difficulty: element.difficulty,
    question: element.question,
    category: element.category,
    answers: element.incorrectAnswers
      .concat(element.correctAnswer).sort(() => Math.random() - ZERO_FIVE),
  }));

  return questionsAndAnswers;
};

export default randomizeQuestions;
