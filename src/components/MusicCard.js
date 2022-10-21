import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      fav: false,
      listFav: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = async ({ target }) => {
    this.setState(() => ({
      fav: target.checked,

    }), this.favoriteSong);
  };

  getFavorites = async () => {
    this.setState({ isLoading: true });
    const list = await getFavoriteSongs();
    this.setState(
      () => ({ listFav: list }),
      () => {
        const { listFav } = this.state;
        const { trackId } = this.props;
        const isFav = listFav.some((music) => (music.trackId === trackId));
        if (isFav) {
          this.setState({ fav: true,
          });
        }
        this.setState({ isLoading: false });
      },
    );
  };

  favoriteSong = async () => {
    const { fav } = this.state;
    const { music, removeSongList } = this.props;
    if (fav) {
      this.setState({ isLoading: true });

      await addSong(music);
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });

      await removeSong(music);
      removeSongList();
      this.setState({ isLoading: false });
    }
    this.getFavorites();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { fav, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="music-card-pricipal-div">
        <h3 className="card-trackname">{trackName}</h3>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          <AiFillHeart className="icon-fav" />
          <input
            type="checkbox"
            name="fav"
            id={ trackId }
            onChange={ this.handleChange }
            checked={ fav }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  removeSongList: PropTypes.func.isRequired,
};
export default MusicCard;
