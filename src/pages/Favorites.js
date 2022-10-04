import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      listFav: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ isLoading: true });
    const list = await getFavoriteSongs();
    this.setState(() => ({
      listFav: list,
    }), () => {
      this.setState({ isLoading: false });
    });
  };

  removeSongList = () => {
    console.log('teses');
    this.getFavorites();
  };

  render() {
    const { isLoading, listFav } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        <div>
          { listFav.map((element) => (<MusicCard
            music={ element }
            key={ element.trackId }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            removeSongList={ this.removeSongList }
          />))}
        </div>
      </div>
    );
  }
}

export default Favorites;
