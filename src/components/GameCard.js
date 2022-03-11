import React from 'react';
import PropTypes from 'prop-types';

class GameCard extends React.Component {
  trueOrFalse = (element) => (element.correctness === true
    ? 'correct-answer'
    : `wrong-answer-${element.index}`)

  handleClickInAnswer = ({ target }) => {
    if (target.name === 'correct-answer') {
      target.className = 'correctAnswer';
    } else {
      target.className = 'incorrectAnswer';
    }
  };

  render() {
    const ZERO_FIVE = 0.5; // NO MAGIC NUMBERS
    const { questions } = this.props;
    const { incorrectAnswers, correctAnswer } = questions;
    const allAnswers = incorrectAnswers.concat(correctAnswer)
      .sort(() => Math.random() - ZERO_FIVE); // concatenar as perguntas e randomiza-las.
    console.log(allAnswers);
    return (
      <div className="game-card">
        <h3 data-testid="question-category">{ questions.category}</h3>
        <h3 data-testid="question-text">{questions.question}</h3>
        <div data-testid="answer-options">
          { allAnswers.map((el, index) => (
            <button
              data-testid={ this.trueOrFalse(el, index) }
              name={ this.trueOrFalse(el, index) }
              type="button"
              key={ index }
              onClick={ this.handleClickInAnswer }
            >
              {el.content}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

GameCard.propTypes = {
  questions: PropTypes.objectOf(Object).isRequired,
};

export default GameCard;
