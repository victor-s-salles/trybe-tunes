import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      albumMusics: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getMusic();
  }

  getMusic = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const album = await getMusics(id);
    this.setState(
      () => ({
        album,
      }),
      this.initAlbum,
    );
  };

  initAlbum = () => {
    const { album } = this.state;
    const albumMusics = [...album];
    albumMusics.shift();
    this.setState({ isLoading: false, albumMusics });
  };

  render() {
    const { album, isLoading, albumMusics } = this.state;
    if (isLoading) return <Loading />;
    const { collectionName, artistName, artworkUrl100 } = album[0];
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h4 data-testid="album-name">
            Collection Name:
            {' '}
            {collectionName}
          </h4>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h6 data-testid="artist-name">
            Artist Name:
            {artistName}
          </h6>
        </div>
        {albumMusics.map((music) => (
          <MusicCard
            music={ music }
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
