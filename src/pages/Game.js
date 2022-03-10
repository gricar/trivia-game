import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestionsAndAnswersThunk } from '../redux/actions';

class Game extends React.Component {

    // const { dispatch, token } = this.props;
    // dispatch(fetchQuestionsAndAnswersThunk(token));

  render() {
    return (
      <Header />
    );
  }
}

export default connect()(Game);
