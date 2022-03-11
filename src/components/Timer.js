import React from 'react';

class Timer extends React.Component {
  state = {
    timeInSec: 30,
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => this.countdown(), ONE_SECOND);
  }

  countdown = () => {
    console.log('entrou');
    const { timeInSec } = this.state;
    if (timeInSec > 25) {
      this.setState((prevState) => ({
        timeInSec: prevState.timeInSec - 1,
      }));
    }
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

export default Timer;
