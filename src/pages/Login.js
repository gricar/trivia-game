import React from 'react';
import logo from '../trivia.png';
import ConfigButton from '../components/ConfigButton';

class Login extends React.Component {
  state = {
    login: '',
    email: '',
    isButtonDisabled: true,
  }

  validateEmail = () => {
    const { login, email } = this.state;
    if (login.length > 0 && email.length > 0) {
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

  render() {
    const { login, email, isButtonDisabled } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <label htmlFor="login">
            Login:
            <input
              onChange={ this.handleInput }
              data-testid="input-player-name"
              name="login"
              type="text"
              value={ login }
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
            type="submit"
            data-testid="btn-play"
          >
            Play

          </button>
        </form>
        <ConfigButton />
      </header>
    );
  }
}

export default Login;
