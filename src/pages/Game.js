import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestionsAndAnswers from '../services/fetchQuestionsAndAnswers';
import GameCard from '../components/GameCard';

class Game extends React.Component {
  // state = {
  //   results: [],
  // }

  componentDidMount= async () => {
    const { token } = this.props;
    const questionsResponse = await fetchQuestionsAndAnswers(token);
    const results = questionsResponse.results
      .map((question) => ({
        question: question.question,
        category: question.category,
        answers: [
          { correct: true, content: question.correct_answer },
          { correct: false, content: question.incorrect_answers },
        ],
      }));
    console.log(results);
  }

  render() {
    return (
      <>
        <Header />
        <GameCard />
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ hasToken, token }) => ({
  hasToken,
  token,
});

export default connect(mapStateToProps)(Game);
