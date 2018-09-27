import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ value, onChange, children }) => (
  <form>
    {children} <input type="text" onChange={onChange} value={value} />
  </form>
);

Search.propTypes = {
  value: PropTypes.string,
  children: PropTypes.string
}

export default Search;