import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameCard extends React.Component {
  componentDidUpdate() {
    const correct = document.querySelector('.correctAnswer');
    const incorrect = document.querySelectorAll('.incorrectAnswer');
    if (correct !== null) {
      correct.className = 'answer';
    }
    incorrect.forEach((element) => { element.className = 'answer'; });
  }

  trueOrFalse = (element) => (element.correctness === true
    ? 'correct-answer'
    : `wrong-answer-${element.index}`)

  handleClickInAnswer = () => {
    const arr = document.querySelectorAll('.answer');
    arr.forEach((element) => {
      if (element.name === 'correct-answer') {
        element.className = 'correctAnswer';
      } else {
        element.className = 'incorrectAnswer';
      }
    });
  };

  render() {
    const { hasTimerExpired, randomizedQuestions } = this.props;
    return (
      <div className="game-card">
        <h3 data-testid="question-category">{ randomizedQuestions.category}</h3>
        <h3 data-testid="question-text">{randomizedQuestions.question}</h3>
        <div data-testid="answer-options">
          { randomizedQuestions.map((el, index) => (
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
  randomizedQuestions: PropTypes.objectOf(Object).isRequired,
  hasTimerExpired: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ hasTimerExpired }) => ({
  hasTimerExpired,
});

export default connect(mapStateToProps)(GameCard);
