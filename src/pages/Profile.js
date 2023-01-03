import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Profile.css';

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
    let info = await getUser();
    if(!info.image) {
      info = {...info, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShJ9Jpov-4Kf5y1kahVXqnjJhAZiEtyDPyZy6JuWEHQ&s'}
    }
    this.setState({ userInfo: info, isLoading: false });
  };

  render() {
    const { isLoading, userInfo } = this.state;
    let { name, email, image, description } = userInfo;
    // if (isLoading) return <Loading />;

    return (
      <div className="profile-principal-div" data-testid="page-profile">
        <Header />
        <div className="profile-second-div">
          {isLoading && <Loading />}
          {!isLoading && (
            <div className="profile-info-div">

              <div className="profile-bar"><h3 /></div>
              <div className="profile-total">
                <div className="profile-lateral-bar">
                  <img
                    className="profile-image"
                    data-testid="profile-image"
                    src={ image }
                    alt={ name }
                  />
                </div>
                {/* <img data-testid="profile-image" src={ image } alt={ name } /> */}
                <div className="profile-info">
                  <div>
                    <h3 className="profile-name">
                      <p>Nome</p>
                      {name}
                    </h3>
                  </div>
                  <h3>
                    <p>E-Mail</p>
                    {email}

                  </h3>
                  <h3>
                    <p>Descrição</p>
                    {description}

                  </h3>
                  <Link to="/profile/edit">
                    <button className="link-edit" type="button">Editar Perfil</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
