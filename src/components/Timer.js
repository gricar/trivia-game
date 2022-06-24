import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    const ZERO = 0;
    if (seconds === ZERO) {
      endGame();
    }
  }

  render() {
    const { seconds } = this.props;
    return (
      <h1>{`${seconds}s`}</h1>
    );
  }
}

Timer.propTypes = {
  tickTimer: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default connect()(Timer);
