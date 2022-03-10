import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestionsAndAnswers from '../services/fetchQuestionsAndAnswers';

class Game extends React.Component {
  // state = {
  //   results: [],
  // }

  componentDidMount= async () => {
    const { token } = this.props;
    const questionsResponse = await fetchQuestionsAndAnswers(token);
    const results = questionsResponse.results
      .map(({ question, correct_answer, incorrect_answers }) => ({
        question,
        aswers: [
          { correct: true, content: correct_answer },
          { correct: false, content: incorrect_answers },
        ],
      }));
    console.log(results);
  }

  render() {
    return (
      <Header />
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
