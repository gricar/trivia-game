import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchTokenThunk from '../redux/actions';

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

  handleSumbit = () => {
    const { dispatch } = this.props;
    dispatch(fetchTokenThunk());
  };

  render() {
    const { login, email, isButtonDisabled } = this.state;
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

        <button
          disabled={ isButtonDisabled }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleSumbit }
        >
          Play
        </button>
      </form>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
