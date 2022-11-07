import "./Post.css";
import React, { useState } from "react";
import moment from "moment/moment";
import shortenNumber from "../utilities/ShortenNumber";
import Comments from "../Comments/Comments";
import { icons } from "../utilities/icons";
import { useSelector } from "react-redux";
import { selectIsLoadingComments } from "../../app/AppSlice";
import MyLoaderComments from "../Comments/CommentsLoading";

const Post = ({ post, handleCommentsClick, selectedComment }) => {
  const [arrow, setArrow] = useState("default");
  const isLoadingComments = useSelector(selectIsLoadingComments);

  const handleArrowClick = (e) => {
    const arrowSelected = e.target.id;

    if (arrowSelected === arrow) {
      setArrow("default");
      return;
    }

    setArrow(arrowSelected);
  };

  return (
    <div className='parent'>
      <div className='div1'>
        <svg
          style={icons.style}
          className='arrow'
          id='up'
          onClick={handleArrowClick}
        >
          <path
            d={icons.paths.arrowUp[arrow === "up" ? "selected" : "unselected"]}
            style={{ color: arrow === "up" ? "purple" : "gray" }}
          ></path>
        </svg>
        <p
          className='likes'
          style={{
            color:
              arrow === "default"
                ? "gray"
                : arrow === "up"
                ? "purple"
                : "#ff8c00",
          }}
        >
          {shortenNumber(post.score, 1)}
        </p>
        <svg
          style={icons.style}
          className='arrow'
          id='down'
          onClick={handleArrowClick}
        >
          <path
            d={
              icons.paths.arrowDown[
                arrow === "down" ? "selected" : "unselected"
              ]
            }
            style={{ color: arrow === "down" ? "#ff8c00" : "gray" }}
          ></path>
        </svg>
      </div>
      <div className='div2'>
        <p className='title bold'>{post.title}</p>
      </div>
      <div className='div3'>
        {post.hasOwnProperty("url_overridden_by_dest") &&
        /.png|.jpg/gm.test(post["url_overridden_by_dest"]) ? (
          <img src={post["url_overridden_by_dest"]} alt='post' />
        ) : (
          <div className='space'></div>
        )}
      </div>
      <div className='div4'>
        <p className='author'>{post.author}</p>
        <p className='timeAgo'>{moment.unix(post.created_utc).fromNow()}</p>
        <div onClick={() => handleCommentsClick(post)} className='comms'>
          <svg style={icons.style} className='commsI'>
            <path d={icons.paths.comment}></path>
          </svg>
          {shortenNumber(post.num_comments, 1)}
        </div>
      </div>
      <div className='div5'>
        {isLoadingComments && selectedComment === post.id && (
          <div className='loading'>
            <MyLoaderComments />
          </div>
        )}
        {post.comments.length > 0 && (
          <Comments
            comments={post.comments.length > 0 ? post.comments : "no comments"}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
