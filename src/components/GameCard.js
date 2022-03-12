import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './GameCard.css';

const RED_BACKGROUND = 'background-red';
const GREEN_BACKGROUND = 'background-green';
class GameCard extends React.Component {
  setDatatestId = (element) => (element.correctness === true
    ? 'correct-answer'
    : `wrong-answer-${element.index}`)

    paintButtons = () => {
      const buttons = document.querySelectorAll('.answers');
      buttons.forEach((element) => {
        if (element.dataset.correctness === 'false') {
          element.classList.add(RED_BACKGROUND);
        } else {
          element.classList.add(GREEN_BACKGROUND);
        }
      });
    }

      checkCorrectness = (buttonElement) => {
        // const { saveScore } = this.props;
        // if (correctness === true) {
        // // saveScore(time);
        // }
        const { target: { dataset: { correctness } } } = buttonElement;
        this.paintButtons();

        if (correctness === 'true') {
          buttonElement.target.classList.add(GREEN_BACKGROUND);
        }
      };

  componentDidUpdate = (prevProps) => {
    const { randomizedQuestions } = this.props;
    if (randomizedQuestions !== prevProps.randomizedQuestions
      && randomizedQuestions !== undefined) {
      const el = document.querySelectorAll('.answers');
      el.forEach((element) => {
        element.classList.remove(RED_BACKGROUND);
        element.classList.remove(GREEN_BACKGROUND);
      });
    }
  }

  handleClickInAnswer = (buttonElement) => {
    this.checkCorrectness(buttonElement);
  };

  render() {
    const { hasTimerExpired, randomizedQuestions, questions } = this.props;
    return (
      <div className="game-card">
        <h3 data-testid="question-category">{ questions.category}</h3>
        <h3 data-testid="question-text">{questions.question}</h3>
        <div data-testid="answer-options">
          { randomizedQuestions.map((el, index) => (
            <button
              className="answers"
              data-testid={ this.setDatatestId(el, index) }
              type="button"
              key={ index }
              disabled={ hasTimerExpired }
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
  randomizedQuestions: PropTypes.objectOf(Object).isRequired,
  hasTimerExpired: PropTypes.bool.isRequired,
  questions: PropTypes.PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = ({ hasTimerExpired, buttonClass }) => ({
  hasTimerExpired,
  buttonClass,
});

// const mapDispatchToProps = (dispatch) => ({
//   saveScore: (time) => dispatch(saveScore(time)),
// });

export default connect(mapStateToProps)(GameCard);
