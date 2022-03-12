import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsAndAnswersThunk } from '../redux/actions';
import GameCard from '../components/GameCard';
// import Timer from '../components/Timer';

const RED_BACKGROUND = 'background-red';
const GREEN_BACKGROUND = 'background-green';

class Game extends React.Component {
  state = {
    renderingCard: '0',
    isNextButtonShowed: false,
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

  clear = () => {
    this.removeColorsFromButtons();
    this.hideNextButton();
  }

  nextQuestion = () => {
    this.setState((state) => ({
      renderingCard: `${Number(state.renderingCard) + 1}`,
    }), this.clear);
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

  renderProperCard = () => {
    const { renderingCard, isNextButtonShowed } = this.state;
    const { questions } = this.props;

    if (questions.length > 0) {
      const NUMBERS = ['0', '1', '2', '3', '4'];

      switch (renderingCard) {
      case NUMBERS[0]:
        return (<GameCard
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          questions={ questions[0] }
          showNextButton={ this.showNextButton }
        />);
      case NUMBERS[1]:
        return (<GameCard
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          showNextButton={ this.showNextButton }
          questions={ questions[1] }
        />);
      case NUMBERS[2]:
        return (<GameCard
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          showNextButton={ this.showNextButton }
          questions={ questions[2] }
        />);
      case NUMBERS[3]:
        return (<GameCard
          addColorsToButtons={ this.addColorsToButtons }
          isNextButtonShowed={ isNextButtonShowed }
          showNextButton={ this.showNextButton }
          questions={ questions[3] }
        />);
      case NUMBERS[4]:
        return (<GameCard
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
    const { isNextButtonShowed } = this.state;
    return (
      <>
        <Header />
        <div>
          { this.renderProperCard() }
        </div>
        { isNextButtonShowed
          ? (<button
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
          >
            next
          </button>) : null }

        {/* <Timer btnClicked={ btnClicked } /> */}
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getQuestionsAndAnswers: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ hasToken, token, questions }) => ({
  hasToken,
  token,
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsAndAnswers: (token) => dispatch(fetchQuestionsAndAnswersThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
