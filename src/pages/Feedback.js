import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './feedback.css';

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
        <div className="feedback animate__animated animate__rotateIn">
          <h1 data-testid="feedback-text">
            {this.handleAssertions(assertions)}
          </h1>
          <div className="assertions">
            <p>Voce acertou</p>
            <h3 data-testid="feedback-total-question">{assertions}</h3>
            <p>perguntas</p>
          </div>
          <div className="assertions">
            <p>Seu placar final é</p>
            <h3 data-testid="feedback-total-score">{score}</h3>
            <p>pontos</p>
          </div>
        </div>
        <div
          className="buttons-fdbck animate__animated animate__fadeInUp animate__delay-2s"
        >
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ () => history.push('/ranking') }
          >
            Melhores resultados
          </button>
        </div>
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
