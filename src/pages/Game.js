import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsAndAnswersThunk } from '../redux/actions';
import GameCard from '../components/GameCard';
import Timer from '../components/Timer';

class Game extends React.Component {
  state = {
    renderingCard: '0',
    btnClicked: false,
  }

  // busca as respostas utilizando o token salvo na store
  componentDidMount = async () => {
    const { token, getQuestionsAndAnswers } = this.props;
    getQuestionsAndAnswers(token);
  }

  nextQuestion = () => {
    this.setState((state) => ({
      renderingCard: `${Number(state.renderingCard) + 1}`,
      btnClicked: !state.btnClicked,
    })); // lint nao permite usar numeros, eis a solucao: tranformar de numero para string, string para numero, somar, de volta para string. elegante?
  }

  randomizeColor = (questionsToBeRandomized) => {
    const ZERO_FIVE = 0.5; // NO MAGIC NUMBERS
    const { incorrectAnswers, correctAnswer } = questionsToBeRandomized;
    return incorrectAnswers.concat(correctAnswer)
      .sort(() => Math.random() - ZERO_FIVE); // concatenar as perguntas e randomiza-las.
  }

  // controle de qual card (perguntas e respostas) sera renderizado
  renderProperCard = () => {
    const { renderingCard } = this.state;
    const { questions } = this.props;

    if (questions.length > 0) {
      const NUMBERS = ['0', '1', '2', '3', '4']; // NO MAGIC NUMBERS

      // this.state.renderingcard controlara a renderizacao
      switch (renderingCard) {
      case NUMBERS[0]:
        return (<GameCard
          questions={ questions }
          randomizedQuestions={ this.randomizeColor(questions[0]) }
        />);
      case NUMBERS[1]:
        return (<GameCard
          questions={ questions }
          randomizedQuestions={ this.randomizeColor(questions[1]) }
        />);
      case NUMBERS[2]:
        return (<GameCard
          questions={ questions }
          randomizedQuestions={ this.randomizeColor(questions[2]) }
        />);
      case NUMBERS[3]:
        return (<GameCard
          questions={ questions }
          randomizedQuestions={ this.randomizeColor(questions[3]) }
        />);
      case NUMBERS[4]:
        return (<GameCard
          questions={ questions }
          randomizedQuestions={ this.randomizeColor(questions[4]) }
        />);
      default:
        return null;
      }
    }
  }

  render() {
    const { btnClicked } = this.state;
    return (
      <>
        <Header />
        <div>
          { this.renderProperCard() }
        </div>
        <button type="button" onClick={ this.nextQuestion }>next</button>
        <Timer btnClicked={ btnClicked } />
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
