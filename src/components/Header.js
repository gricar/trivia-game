import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarUrl from '../services/getGravatarUrls';

class Header extends React.Component {
  render() {
    const { userName, userEmail, userScore } = this.props;
    return (
      <header className="header">
        <img
          data-testid="header-profile-picture"
          src={ getGravatarUrl(userEmail) }
          alt="Gravatar"
        />
        <p data-testid="header-player-name">
          Nome:
          {userName}
        </p>
        <p data-testid="header-score">
          Score: 0
          {userScore}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userScore: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  userScore: state.player.score,
});

export default connect(mapStateToProps)(Header);
