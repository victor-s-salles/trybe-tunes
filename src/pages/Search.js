import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

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
      <div>
        <h2>
          Resultado de álbuns de:
          {' '}
          {historySearch}
        </h2>
        {searchList.map((obj, index) => (
          <div key={ index }>
            <img
              src={ obj.artworkUrl100 }
              alt={ obj.collectionName }
            />
            <p>{obj.collectionName}</p>
            <p>{obj.artistName}</p>
            <Link
              data-testid={ `link-to-album-${obj.collectionId}` }
              to={ `/album/${obj.collectionId}` }
            >
              Ir Para

            </Link>
          </div>))}
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
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <form action="">
          <input
            data-testid="search-artist-input"
            name="search"
            type="text"
            onChange={ this.handleChange }
            value={ search }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ btnDisable }
            onClick={ this.clickBtn }
          >
            Pesquisar

          </button>
        </form>
        <div>{this.mapSearch()}</div>
        <div>{!foundResults && <p>Nenhum álbum foi encontrado</p>}</div>
      </div>
    );
  }
}

export default Search;
