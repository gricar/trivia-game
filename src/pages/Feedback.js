import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  // Lint?
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
    const { assertions, score, history } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {this.handleAssertions(assertions)}
        </h1>
        <p>Voce acertou: </p>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <p>Seu placar final eh: </p>
        <h2 data-testid="feedback-total-score">{score}</h2>

        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          <h3>Clique aqui para jogar novamente!</h3>

        </button>

        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          <h3>Melhores Resultados</h3>

        </button>

      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = ({ player: { assertions, name, score } }) => ({
  assertions,
  name,
  score,

});

export default connect(mapStateToProps)(Feedback);
