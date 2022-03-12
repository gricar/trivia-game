import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarUrl from '../services/getGravatarUrls';

class Header extends React.Component {
  componentDidUpdate = () => {
    const { score } = this.props;
    localStorage.setItem('score', score);
  }

  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div className="header-content">
        <img
          data-testid="header-profile-picture"
          src={ getGravatarUrl(gravatarEmail) }
          alt="Gravatar"
        />
        <p data-testid="header-player-name">
          Nome:
          {name}
        </p>
        <p data-testid="header-score">
          Score:
          {' '}
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name,
  gravatarEmail,
  score,
});

export default connect(mapStateToProps)(Header);
