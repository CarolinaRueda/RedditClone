import React from "react";
import "./Subreddits.css";
import { sub_reddits } from "../utilities/Sub_reddits";
import { useDispatch } from "react-redux";
import {
  resetNoMatches,
  setFilteredPost,
  setStaticTerm,
  setSubReddit,
  setTerm,
} from "../../app/AppSlice";

const Subreddits = () => {
  const dispatch = useDispatch();

  const handleSubRedditClick = (sub) => {
    dispatch(setTerm(""));
    dispatch(setStaticTerm(""));
    dispatch(resetNoMatches(false));
    dispatch(setFilteredPost("reset"));
    dispatch(setSubReddit(sub));
  };

  return (
    <div className='contSb'>
      <div className='contSub'>
        <p className='titleSub'>Subreddits</p>
        {sub_reddits.map((subRed, index) => (
          <div
            key={index}
            className='subredd'
            onClick={() => handleSubRedditClick(subRed.reddit)}
          >
            <img src={subRed.src} alt='avatar' className='avatar' />
            <p className='subTitle'>{subRed.reddit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subreddits;
