import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './GameCard.css';
import { setScore } from '../redux/actions';

class GameCard extends React.Component {
  getDifficulty = (difficulty) => {
    const THREE = 3;
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return THREE;
    default:
      break;
    }
  }

  setDatatestId = (element) => (element.correctness === true
    ? 'correct-answer'
    : `wrong-answer-${element.index}`)

  checkCorrectness = (buttonElement) => {
    const { target: { dataset: { correctness } } } = buttonElement;
    const { saveScore, seconds, questions: { difficulty } } = this.props;
    if (correctness === 'true') {
      saveScore(seconds, this.getDifficulty(difficulty));
    }
  };

  handleClickInAnswer = (buttonElement) => {
    const { endGame } = this.props;
    this.checkCorrectness(buttonElement);
    endGame();
  };

  render() {
    const { hasChoicesExpired, questions } = this.props;

    return (
      <div className="game-card">
        <h3 data-testid="question-category">{ questions.category}</h3>
        <h3 data-testid="question-text">{questions.question}</h3>
        <div data-testid="answer-options">
          { questions.answers.map((el, index) => (
            <button
              className="answers"
              data-testid={ this.setDatatestId(el, index) }
              type="button"
              key={ index }
              disabled={ hasChoicesExpired }
              onClick={ this.handleClickInAnswer }
              data-correctness={ el.correctness }
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
  hasChoicesExpired: PropTypes.bool.isRequired,
  questions: PropTypes.PropTypes.objectOf(Object).isRequired,
  // showNextButton: PropTypes.func.isRequired,
  // addColorsToButtons: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  saveScore: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

const mapStateToProps = ({ hasChoicesExpired, buttonClass }) => ({
  hasChoicesExpired,
  buttonClass,
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (time, diff) => dispatch(setScore(time, diff)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
