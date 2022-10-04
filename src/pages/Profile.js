import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState({ isLoading: true });
    const info = await getUser();
    this.setState({ userInfo: info,
      isLoading: false });
  };

  render() {
    const { isLoading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    // if (isLoading) return <Loading />;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading && <Loading />}
        {!isLoading && <div>
          <img data-testid="profile-image" src={ image } alt={ name } />
          <Link to="/profile/edit"><h5>Editar perfil</h5></Link>
          <div>
            <h3>
              <h3>User Test</h3>
              {name}

            </h3>
          </div>
          <h3>
            {email}
          </h3>
          <h3>
            {description}
          </h3>
        </div>}
      </div>
    );
  }
}

export default Profile;
