import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimerExpired } from '../redux/actions';

class Timer extends React.Component {
  componentDidMount = () => {
    const { tickTimer } = this.props;
    tickTimer();
  }

  componentWillUnmount = () => {
    const { stopTimer } = this.props;
    stopTimer();
  }

  componentDidUpdate = () => {
    const { seconds, endGame } = this.props;
    const { dispatch } = this.props;
    const ZERO = 0;
    if (seconds === ZERO) {
      // stopTimer();
      // addColorsToButtons();
      endGame();
      dispatch(setTimerExpired(true));
    }
  }

  render() {
    const { seconds } = this.props;
    return (
      <h1>{seconds}</h1>
    );
  }
}

Timer.propTypes = {
  tickTimer: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
