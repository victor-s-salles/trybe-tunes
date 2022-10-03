import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
    const { name } = await getUser();
    this.setState({ name, isLoading: false });
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <p data-testid="header-user-name">
          Nome:
          {' '}
          {isLoading ? <Loading /> : name }
        </p>
      </header>
    );
  }
}

export default Header;
