import React from 'react';

class Login extends React.Component {
  state = {
    login: '',
    email: '',
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { login, email } = this.state;
    return (
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

        <button type="submit" data-testid="btn-play">Play</button>
      </form>
    );
  }
}

export default Login;
