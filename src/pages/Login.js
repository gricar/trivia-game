import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser, fetchTokenThunk } from '../redux/actions';
import logo from '../trivia.png';
import ConfigButton from '../components/ConfigButton';
import './game.css';
import 'animate.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isButtonDisabled: true,
  }

  validateEmail = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateEmail);
  }

  handleSumbit = async () => {
    const { getToken, history, userToStore } = this.props;
    const { name, email } = this.state;
    userToStore(name, email);
    await getToken();
    history.push('/game');
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <div className="login-page">
        <img
          src={ logo }
          className="App-logo animate__animated animate__flip animate__repeat-1"
          alt="logo"
        />
        <div className="animate__animated animate__fadeInUp animate__delay-1s">
          <form className="loginForm">
            <label htmlFor="name">
              Name:
              <input
                onChange={ this.handleInput }
                data-testid="input-player-name"
                name="name"
                type="text"
                value={ name }
                className="login-input"
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                onChange={ this.handleInput }
                data-testid="input-gravatar-email"
                name="email"
                type="email"
                value={ email }
                className="login-input"
              />
            </label>
            <button
              disabled={ isButtonDisabled }
              type="button"
              data-testid="btn-play"
              onClick={ this.handleSumbit }
            >
              Play
            </button>
          </form>
          <ConfigButton />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  userToStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name,
  gravatarEmail,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  userToStore: (name, email) => dispatch(setUser(name, email)),
  getToken: () => dispatch(fetchTokenThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
