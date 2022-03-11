import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameCard extends React.Component {
  trueOrFalse = (element) => (element.correctness === true
    ? 'correct-answer'
    : `wrong-answer-${element.index}`)

  handleClickInAnswer = () => {
    const allAnswers = document.querySelectorAll('.answer');
    allAnswers.forEach((element) => {
      if (element.name === 'correct-answer') {
        element.className = 'correctAnswer';
      } else {
        element.className = 'incorrectAnswer';
      }
    });
  };

  render() {
    const ZERO_FIVE = 0.5; // NO MAGIC NUMBERS
    const { questions, hasTimerExpired } = this.props;
    const { incorrectAnswers, correctAnswer } = questions;
    const allAnswers = incorrectAnswers.concat(correctAnswer)
      .sort(() => Math.random() - ZERO_FIVE); // concatenar as perguntas e randomiza-las.
    return (
      <div className="game-card">
        <h3 data-testid="question-category">{ questions.category}</h3>
        <h3 data-testid="question-text">{questions.question}</h3>
        <div data-testid="answer-options">
          { allAnswers.map((el, index) => (
            <button
              data-testid={ this.trueOrFalse(el, index) }
              className="answer"
              name={ this.trueOrFalse(el, index) }
              type="button"
              key={ index }
              disabled={ hasTimerExpired }
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
  hasTimerExpired: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ hasTimerExpired }) => ({
  hasTimerExpired,
});

export default connect(mapStateToProps)(GameCard);
