import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      btnDisable: true,
      isLoading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState({ isLoading: true });
    const info = await getUser();
    this.setState({ userInfo: info,
      isLoading: false }, this.displayInfo);
  };

  displayInfo = () => {
    const { userInfo } = this.state;
    const { name, description, email, image } = userInfo;
    this.setState({
      name,
      description,
      email,
      image,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }), () => { this.validadeInputs(); });
  };

  validadeInputs = () => {
    const { name, description, email, image } = this.state;
    if (name.length < 1 || description.length < 1
      || email.length < 1 || image.length < 1) {
      this.setState({ btnDisable: true });
    } else { this.setState({ btnDisable: false }); }
  };

  sendNewInfo = async () => {
    const { name, description, email, image } = this.state;
    const newInfo = {
      name,
      description,
      email,
      image,
    };
    this.setState({ isLoading: true });
    await updateUser(newInfo);
    this.setState({ isLoading: false });
    const { history } = this.props;
    history.push('/profile');
  };

  render() {
    const { name, description, email, image, isLoading, btnDisable } = this.state;
    return (
      <div className="edit-pricipal-div" data-testid="page-profile-edit">
        <Header />
        <div className="edit-div-total">
          <div className="edit-superior"><h1 /></div>
          <div className="edit-content">
            <div className="edit-div-foto">
              <img className="edit-profile-photo" src={ image } alt="Foto Perfil" />
              <label htmlFor="image">
                <input
                  className="edit-photo-input"
                  placeholder="Insira um link"
                  type="text"
                  id="image"
                  name="image"
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                  value={ image }
                />
              </label>

            </div>
            <div className="edit-second-div">

              {isLoading && <Loading />}
              <form className="edit-form" action="">

                <label htmlFor="name">
                  Nome
                  <input
                    type="text"
                    id="name"
                    name="name"
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                    value={ email }
                  />
                </label>
                <label htmlFor="description">
                  Descrição
                  <input
                    type="text"
                    id="description"
                    name="description"
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                    value={ description }
                  />
                </label>

                <button
                  className="edit-btn"
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ btnDisable }
                  onClick={ this.sendNewInfo }
                >
                  Salvar

                </button>

              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default ProfileEdit;
