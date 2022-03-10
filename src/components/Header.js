import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarUrl from '../services/getGravatarUrls';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <div className="header-content">
        <img
          data-testid="header-profile-picture"
          src={ getGravatarUrl(email) }
          alt="Gravatar"
        />
        <p data-testid="header-player-name">
          Nome:
          {name}
        </p>
        <p data-testid="header-score">
          Score: 0
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name, gravatarEmail, score,
});

export default connect(mapStateToProps)(Header);
