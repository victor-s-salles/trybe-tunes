import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';
import logo from './images/login-logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loginDisable: true,
      isLoading: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }), this.validadeName());
  };

  validadeName = () => {
    const { name } = this.state;
    const minLength = 2;
    if (name.length >= minLength) {
      this.setState({ loginDisable: false });
    } else {
      this.setState({ loginDisable: true });
    }
  };

  saveLogin = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState(() => ({
      isLoading: true,
    }), () => { });
    await createUser({ name });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { name, loginDisable, isLoading } = this.state;
    // if (isLoading) return <Loading />;
    return (
      <div className="login-div" data-testid="page-login">
        <form className="login-form" action="">
          <div className="login-form-div">
            <img className="login-logo" src={ logo } alt="Logo trybe tunes" />
            <label htmlFor="login" className="login-label">

              <input
                className="login-input"
                placeholder="Qual é seu nome?"
                id="login"
                name="name"
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                value={ name }
                onKeyUp={ this.handleChange }
              />
            </label>
            <button
              className="login-button"
              type="button"
              data-testid="login-submit-button"
              disabled={ loginDisable }
              onClick={ this.saveLogin }
            >
              Entrar
            </button>
          </div>
          {isLoading && <Loading />}
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
