import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      btnDisable: true,
      isLoading: true,
      searchList: [],
      foundResults: true,
    };
  }

  componentDidMount() {
    this.searchArtist();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }), this.validadeSearch());
  };

  validadeSearch = () => {
    const { search } = this.state;
    const minLength = 1;
    if (search.length >= minLength) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  searchArtist = async () => {
    const { search } = this.state;
    const searchList = await searchAlbumsAPI(search);
    this.setState(() => ({ isLoading: false,
      searchList }), () => {
      this.setState({ isLoading: false });
      this.validadeResults();
    });
  };

  clickBtn = () => {
    this.searchArtist();
    const { search } = this.state;
    this.setState(() => ({
      historySearch: search,
      search: '',
      isLoading: true,
    }));
  };

  validadeResults = () => {
    const { searchList } = this.state;
    if (searchList.length < 1) {
      this.setState({ foundResults: false });
    } else {
      this.setState({ foundResults: true });
    }
  };

  mapSearch = () => {
    const { searchList, historySearch } = this.state;
    const list = (
      <div className="search-results-map">
        <div className="search-div-h3-results">
          <h2 className="search-h2-results">
            Resultado de álbuns de:
            {' '}
            {historySearch}
          </h2>
        </div>
        <div className="map-div-search">
          {searchList.map((obj, index) => (
            <div className="div-map-search" key={ index }>

              <Link
                data-testid={ `link-to-album-${obj.collectionId}` }
                to={ `/album/${obj.collectionId}` }
              >
                <img
                  className="image-search"
                  src={ obj.artworkUrl100 }
                  alt={ obj.collectionName }
                />
                <p className="collection-search">{obj.collectionName}</p>
                <p className="artistName-search">{obj.artistName}</p>

              </Link>
            </div>))}
        </div>
      </div>);
    if (searchList < 1) {
      return [];
    }
    return list;
  };

  render() {
    const { search, btnDisable, isLoading, foundResults } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="search-div" data-testid="page-search">
        <Header />
        <div className="search-div-bar">
          <div className="search-div-form">
            <form action="">
              <input
                className="search-input"
                data-testid="search-artist-input"
                name="search"
                type="text"
                onChange={ this.handleChange }
                onKeyUp={ this.handleChange }
                value={ search }
                placeholder="Nome do Artista"
              />
              <button
                className="search-btn"
                data-testid="search-artist-button"
                type="button"
                disabled={ btnDisable }
                onClick={ this.clickBtn }
              >
                Procurar

              </button>
            </form>
          </div>
          <div className="search-results-div">
            <div className="search-results-map-pre">{this.mapSearch()}</div>
            <div className="search-not-div-search">
              {!foundResults
            && <p className="text-not-div-search">Nenhum álbum foi encontrado</p>}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
