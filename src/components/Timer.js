import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimerExpired } from '../redux/actions';

class Timer extends React.Component {
  state = {
    timeInSec: 30,
  }

  componentDidMount() {
    this.countdown();
  }

  componentDidUpdate(prevProps) {
    const { timeInSec, intervalTime } = this.state;
    const { btnClicked, dispatch } = this.props;
    if (timeInSec === 0) {
      dispatch(setTimerExpired(true));
      clearInterval(intervalTime);
    }

    if (btnClicked !== prevProps.btnClicked) {
      this.resetTimerAndButtons();
    }
  }

  countdown = () => {
    const ONE_SECOND = 1000;

    const intervalTime = setInterval(() => {
      this.setState((prevState) => ({
        timeInSec: prevState.timeInSec - 1,
      }));
    }, ONE_SECOND);

    this.setState({ intervalTime });
  }

  resetTimerAndButtons = () => {
    this.setState(() => ({
      timeInSec: 30,
    }), this.countdown());

    const { dispatch } = this.props;
    dispatch(setTimerExpired(false));
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
