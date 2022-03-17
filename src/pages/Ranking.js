import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveRanking, getRanking } from '../services/localStorage';
import getGravatarUrl from '../services/getGravatarUrls';
import './ranking.css';

class Ranking extends React.Component {
  renderRanking = () => {
    const { player } = this.props;
    saveRanking(player);

    const playersRanking = getRanking();
    const sortedRanking = playersRanking
      .sort((playerA, playerB) => playerB.score - playerA.score);
    return (
      <tbody>
        {
          sortedRanking.map((person, index) => {
            const { gravatarEmail, name, score } = person;
            return (
              <tr key={ index }>
                <td>
                  <img
                    src={ getGravatarUrl(gravatarEmail) }
                    className="profile-picture"
                    alt="Gravatar"
                  />
                </td>
                <td data-testid={ `player-name-${index}` }>{name}</td>
                <td data-testid={ `player-score-${score}` }>{score}</td>
              </tr>
            );
          })
        }
      </tbody>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table className="ranking-table animate__animated animate__fadeInDownBig">
          <thead>
            <tr>
              <th>Player</th>
              <th>Name</th>
              <th>Scores</th>
            </tr>
          </thead>
          { this.renderRanking() }
        </table>
        <button
          data-testid="btn-go-home"
          type="button"
          className="button-back-to-home"
          onClick={ () => history.push('/') }
        >
          Voltar ao inicio
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
