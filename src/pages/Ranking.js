import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveRanking, getRanking } from '../services/localStorage';
import getGravatarUrl from '../services/getGravatarUrls';

class Ranking extends React.Component {
  renderRanking = () => {
    const { player } = this.props;
    saveRanking(player);

    const playersRanking = getRanking();
    const sortedRanking = playersRanking
      .sort((playerA, playerB) => playerB.score - playerA.score);
    return (
      <div>
        {
          sortedRanking.map((person, index) => {
            const { gravatarEmail, name, score } = person;
            return (
              <li key={ index }>
                <img
                  src={ getGravatarUrl(gravatarEmail) }
                  alt="Gravatar"
                />
                <p data-testid={ `player-name-${index}` }>{name}</p>
                <p data-testid={ `player-score-${score}` }>{score}</p>
              </li>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <ul>
            { this.renderRanking() }
          </ul>
        </div>
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
  player: PropTypes.shape.isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(Ranking);
