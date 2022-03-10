import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTokenThunk, { setUser } from '../redux/actions';
import logo from '../trivia.png';
import ConfigButton from '../components/ConfigButton';

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
    const { getToken, history, userToStore } = this.props;
    const { name, email } = this.state;
    userToStore(name, email);
    getToken();
    history.push('/game');
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="name">
            Name:
            <input
              onChange={ this.handleInput }
              data-testid="input-player-name"
              name="name"
              type="text"
              value={ name }
            />
          </label>
          <label htmlFor="email">
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
  getToken: PropTypes.func.isRequired,
  userToStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ name, gravatarEmail, score }) => ({
  name,
  gravatarEmail,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  userToStore: (name, email) => dispatch(setUser(name, email)),
  getToken: () => dispatch(fetchTokenThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
