import React from "react";
import "./App.css";
import Header from "../features/Header/Header";
import Home from "../features/Home/Home";
import Subreddits from "../features/Subreddits/Subreddits";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadPosts,
  selectFilteredPost,
  selectIsLoadingPosts,
  selectPosts,
  selectSubReddit,
} from "./AppSlice";
import MyLoader from "../features/Post/PostLoading";

function App() {
  const dispatch = useDispatch();
  const subReddit = useSelector(selectSubReddit);
  const posts = useSelector(selectPosts);
  const filteredPost = useSelector(selectFilteredPost);
  const isLoadingPosts = useSelector(selectIsLoadingPosts);

  useEffect(() => {
    dispatch(asyncLoadPosts(subReddit));
  }, [dispatch, subReddit]);

  // <h2 className="center">Loading posts...</h2>

  return (
    <div>
      <Header />
      <div className='contApp'>
        <div className='homeApp'>
          {isLoadingPosts && (
            <div className='center'>
              {/* <h2 className='loading'>Loading post...</h2> */}
              <MyLoader />
            </div>
          )}
          {!isLoadingPosts && (
            <Home posts={filteredPost.length > 0 ? filteredPost : posts} />
          )}
        </div>
        <div className='subsApp'>
          <Subreddits />
        </div>
      </div>
    </div>
  );
}

export default App;
