import "./SearchBar.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTerm,
  setTerm,
  setFilteredPost,
  setStaticTerm,
  resetNoMatches,
} from "../../app/AppSlice";

const SearchBar = () => {
  const term = useSelector(selectTerm);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setTerm(e.target.value));
  };

  const handleTermSubmit = (e) => {
    e.preventDefault();
    if (term === "") {
      dispatch(resetNoMatches());
    }
    dispatch(setStaticTerm(term));
    dispatch(setFilteredPost());
  };

  return (
    <div>
      <form onSubmit={handleTermSubmit}>
        <input
          value={term}
          className='bkg'
          type='text'
          placeholder='Search here...'
          onChange={handleSearchChange}
        ></input>
        <button>
          <i className='fa-sharp fa-solid fa-magnifying-glass'></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
