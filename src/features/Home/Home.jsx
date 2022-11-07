import { useState } from "react";
import "./Home.css";
// import img from "./img.jpg";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNoMatches,
  selectSubReddit,
  resetComments,
  resetNoMatches,
  setTerm,
  selectStaticTerm,
  setStaticTerm,
  asyncLoadComments,
} from "../../app/AppSlice";
import Post from "../Post/Post";

const Home = ({ posts }) => {
  const subReddit = useSelector(selectSubReddit);
  const noMatches = useSelector(selectNoMatches);
  const staticTerm = useSelector(selectStaticTerm);
  const dispatch = useDispatch();
  const [selectedComment, setSelectedComment] = useState("");

  const handleCommentsClick = (post) => {
    const { num_comments, id, comments } = post;
    setSelectedComment(id);
    if (num_comments === 0) return;
    if (comments.length > 0) {
      dispatch(resetComments(id));
      return;
    }
    dispatch(asyncLoadComments({ subReddit, id }));
  };

  return (
    <div className='container'>
      {noMatches && (
        <div className='searchResults'>
          <p>
            No matches for "<span>{staticTerm}</span>"
          </p>
          <button
            onClick={() => {
              dispatch(resetNoMatches());
              dispatch(setTerm(""));
              dispatch(setStaticTerm(""));
            }}
          >
            GO HOME
          </button>
        </div>
      )}
      {!noMatches &&
        posts.map((post, index) => (
          <Post
            post={post}
            key={index}
            handleCommentsClick={handleCommentsClick}
            selectedComment={selectedComment}
          />
        ))}
    </div>
  );
};

export default Home;
