import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsAndAnswersThunk } from '../redux/actions';

class Game extends React.Component {
  componentDidUpdate() {
    const { dispatch, hasToken, token } = this.props;
    if (hasToken) dispatch(fetchQuestionsAndAnswersThunk(token));
  }

  render() {
    return (
      <Header />
    );
  }
}

const mapStateToProps = ({ hasToken, token }) => ({
  hasToken,
  token,
});

export default connect(mapStateToProps)(Game);

const { func, bool, string } = PropTypes;

Game.propTypes = {
  dispatch: func.isRequired,
  hasToken: bool.isRequired,
  token: string.isRequired,
};
