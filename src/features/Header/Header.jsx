import "./Header.css";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { FaReddit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setSubReddit,
  setTerm,
  setStaticTerm,
  setFilteredPost,
  resetNoMatches,
} from "../../app/AppSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handlePopularClick = () => {
    dispatch(setSubReddit("popular"));
    dispatch(setTerm(""));
    dispatch(setStaticTerm(""));
    dispatch(resetNoMatches(false));
    dispatch(setFilteredPost("reset"));
  };

  return (
    <header className='contHeader'>
      <div className='left' onClick={handlePopularClick}>
        <FaReddit className='logo-icon colorP' />
        <h2 className='titleH'>
          Reddit<span className='colorP'>Clone</span>
        </h2>
      </div>
      <div className='center'>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
