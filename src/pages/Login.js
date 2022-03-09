import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../redux/actions';

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

  render() {
    const { name, email, isButtonDisabled } = this.state;
    const { userToStore } = this.props;
    return (
      <form>
        <label htmlFor="name">
          Login:
          <input
            onChange={ this.handleInput }
            data-testid="input-player-name"
            name="name"
            type="text"
            value={ name }
          />
        </label>
        <label htmlFor="name">
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
          onClick={ () => userToStore(name, email) }
        >
          Play

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  userToStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  userScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  userToStore: (name, email) => dispatch(setUser(name, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
