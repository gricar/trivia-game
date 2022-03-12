import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { expireChoices, fetchQuestionsAndAnswersThunk } from '../redux/actions';
import GameCard from '../components/GameCard';
import Timer from '../components/Timer';

const RED_BACKGROUND = 'background-red';
const GREEN_BACKGROUND = 'background-green';

class Game extends React.Component {
  state = {
    gamePhase: '0',
    isNextButtonShowed: false,
    seconds: 30,
  }

  tickTimer = () => {
    const ONE_SECOND = 200;
    this.timerID = setInterval(() => {
      this.setState((state) => ({
        seconds: state.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  endGame = () => {
    const { disableQuestionsButton } = this.props;
    this.stopTimer();
    disableQuestionsButton();
    this.showNextButton();
    this.addColorsToButtons();
  }

  resetTimer = () => {
    this.setState(() => ({
      seconds: 30,
    }), this.tickTimer);
  }

  prepareNextPhase = () => {
    const { enableQuestionsButton } = this.props;
    this.removeColorsFromButtons();
    this.hideNextButton();
    this.resetTimer();
    enableQuestionsButton();
  }

  nextQuestion = () => {
    this.setState((state) => ({
      gamePhase: `${Number(state.gamePhase) + 1}`,
    }), this.prepareNextPhase);
  }

  stopTimer = () => {
    clearInterval(this.timerID);
  }

  componentDidMount = async () => {
    const { token, getQuestionsAndAnswers } = this.props;
    getQuestionsAndAnswers(token);
  }

  addColorsToButtons = () => {
    const buttons = document.querySelectorAll('.answers');
    buttons.forEach((element) => {
      if (element.dataset.correctness === 'false') {
        element.classList.add(RED_BACKGROUND);
      } else {
        element.classList.add(GREEN_BACKGROUND);
      }
    });
  }

  removeColorsFromButtons = () => {
    const elementoToBeColored = document.querySelectorAll('.answers');
    elementoToBeColored.forEach((element) => {
      element.classList.remove(RED_BACKGROUND);
      element.classList.remove(GREEN_BACKGROUND);
    });
  }

  showNextButton = () => {
    this.setState({
      isNextButtonShowed: true,
    });
  }

  hideNextButton = () => {
    this.setState({
      isNextButtonShowed: false,
    });
  }

  renderNextButton = () => {
    const { isNextButtonShowed } = this.state;
    if (isNextButtonShowed) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.nextQuestion }
        >
          next
        </button>);
    }
  }

  renderProperCard = () => {
    const { gamePhase, isNextButtonShowed, seconds } = this.state;
    const { questions } = this.props;

    if (questions.length > 0) {
      const NUMBERS = ['0', '1', '2', '3', '4', '5'];

      switch (gamePhase) {
      case NUMBERS[0]:
        return (<GameCard
          seconds={ seconds }
          endGame={ this.endGame }
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          questions={ questions[0] }
          showNextButton={ this.showNextButton }
        />);
      case NUMBERS[1]:
        return (<GameCard
          seconds={ seconds }
          endGame={ this.endGame }
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          showNextButton={ this.showNextButton }
          questions={ questions[1] }
        />);
      case NUMBERS[2]:
        return (<GameCard
          seconds={ seconds }
          endGame={ this.endGame }
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          showNextButton={ this.showNextButton }
          questions={ questions[2] }
        />);
      case NUMBERS[3]:
        return (<GameCard
          seconds={ seconds }
          endGame={ this.endGame }
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          showNextButton={ this.showNextButton }
          questions={ questions[3] }
        />);
      case NUMBERS[4]:
        return (<GameCard
          seconds={ seconds }
          endGame={ this.endGame }
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          showNextButton={ this.showNextButton }
          questions={ questions[4] }
        />);
      default:
        return null;
      }
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <>
        <Header />
        <Timer
          endGame={ this.endGame }
          addColorsToButtons={ this.addColorsToButtons }
          stopTimer={ this.stopTimer }
          tickTimer={ this.tickTimer }
          seconds={ seconds }
        />
        <div>
          { this.renderProperCard() }
        </div>
        { this.renderNextButton()}
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getQuestionsAndAnswers: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  enableQuestionsButton: PropTypes.func.isRequired,
  disableQuestionsButton: PropTypes.func.isRequired,
};

const mapStateToProps = ({ hasToken, token, questions }) => ({
  hasToken,
  token,
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsAndAnswers: (token) => dispatch(fetchQuestionsAndAnswersThunk(token)),
  enableQuestionsButton: () => dispatch(expireChoices(false)),
  disableQuestionsButton: () => dispatch(expireChoices(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
