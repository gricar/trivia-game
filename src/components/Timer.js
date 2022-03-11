import React from 'react';
import PropTypes from 'prop-types';

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
      this.resetTimer();
    }
  }

  countdown = () => {
    const { timeInSec } = this.state;
    if (timeInSec > 0) {
      this.setState((prevState) => ({
        timeInSec: prevState.timeInSec - 1,
      }));
    }
  }

  resetTimer = () => {
    this.setState(() => ({
      timeInSec: 30,
    }));
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
};

export default Timer;
