import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  
  const onSearchInputChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const onSearchFromSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      alert('Please, enter your query !');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
      <div>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={onSearchFromSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              value={searchQuery}
              onChange={onSearchInputChange}
              placeholder="Search images..."
            />
          </form>
        </header>
      </div>
    );
  }

  Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
