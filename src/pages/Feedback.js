import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleAssertions = (assert) => {
    const COULD_BE_BETTER = 'Could be better...';
    const WELL_DONE = 'Well Done!';

    switch (assert) {
    case 0:
      return COULD_BE_BETTER;
    case 1:
      return COULD_BE_BETTER;
    case 2:
      return COULD_BE_BETTER;
    default:
      return WELL_DONE;
    }
  }

  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {this.handleAssertions(assertions)}

        </h1>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { assertions, name, score } }) => ({
  assertions,
  name,
  score,

});

export default connect(mapStateToProps)(Feedback);
