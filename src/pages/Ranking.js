import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          <h4>Voltar ao inicio</h4>

        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Ranking;
