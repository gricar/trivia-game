import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTokenThunk, { setUser } from '../redux/actions';
import logo from '../trivia.png';
import ConfigButton from '../components/ConfigButton';
import Header from '../components/Header';

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

  handleSumbit = () => {
    const { getGame, history, name, email, userToStore } = this.props;
    userToStore(name, email);
    getGame();
    history.push('/game');
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <header className="App-header">
        <Header />
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="login">
            Login:
            <input
              onChange={ this.handleInput }
              data-testid="input-player-name"
              name="name"
              type="text"
              value={ name }
            />
          </label>
          <label htmlFor="login">
            email:
            <input
              onChange={ this.handleInput }
              data-testid="input-gravatar-email"
              name="email"
              type="email"
              value={ email }
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
      </header>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getGame: PropTypes.func.isRequired,
  userToStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  userScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  userToStore: (name, email) => dispatch(setUser(name, email)),
  getGame: () => dispatch(fetchTokenThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
