import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer } from '../redux/actions';

class Timer extends React.Component {
  state = {
    timeInSec: 30,
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => this.countdown(), ONE_SECOND);
  }

  componentDidUpdate(prevProps) {
    const { btnClicked } = this.props;
    if (btnClicked !== prevProps.btnClicked) {
      this.resetTimerAndButtons();
    }
  }

  countdown = () => {
    const { dispatch } = this.props;
    const { timeInSec } = this.state;
    if (timeInSec > 0) {
      this.setState((prevState) => ({
        timeInSec: prevState.timeInSec - 1,
      }));
    }
    if (timeInSec === 0) {
      dispatch(setTimer(true));
    }
  }

  resetTimerAndButtons = () => {
    this.setState(() => ({
      timeInSec: 30,
    }));
    const { dispatch } = this.props;
    dispatch(setTimer(false));
  }

  render() {
    const { timeInSec } = this.state;
    return (
      <div>
        { `${timeInSec}s` }
      </div>
    );
  }
}

Timer.propTypes = {
  btnClicked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
