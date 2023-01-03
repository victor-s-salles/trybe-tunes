import React from 'react';
import { AiOutlineSearch, AiOutlineStar, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import './Header.css';
import logo from '../pages/images/login-logo.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const { name, image } = await getUser();
    this.setState({ name, isLoading: false, image });

    if(!image) {
      this.setState({ image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShJ9Jpov-4Kf5y1kahVXqnjJhAZiEtyDPyZy6JuWEHQ&s",})
    }

  };

  render() {
    const { name, isLoading, image } = this.state;
    return (
      <header className="header-header" data-testid="header-component">
        <img className="header-logo" src={ logo } alt="" />
        <div className="header-links">

          <Link className="header-link" data-testid="link-to-search" to="/search">
            <AiOutlineSearch className="header-icon" />
            <span>Procurar</span>
          </Link>
          <Link className="header-link" data-testid="link-to-favorites" to="/favorites">
            <AiOutlineStar className="header-icon" />
            <span>Favoritos</span>

          </Link>
          <Link className="header-link" data-testid="link-to-profile" to="/profile">
            <AiOutlineUser className="header-icon" />
            <span>Perfil</span>

          </Link>
        </div>
        <div className="header-name">
          <img className="header-image" src={ image } alt="Foto de perfil" />
          <p data-testid="header-user-name">
            {' '}
            {isLoading ? <Loading /> : name }
          </p>
        </div>
      </header>
    );
  }
}

export default Header;
