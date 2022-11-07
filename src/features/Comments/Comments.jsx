import React from "react";
import "./Comments.css";
import moment from "moment/moment";

const Comments = ({ comments }) => {
  return (
    <>
      {comments === "no comments" ? (
        ""
      ) : (
        <div>
          {comments.slice(0, 5).map((comment, index) => (
            <div key={`comment_${index}`}>
              {comment.author === "madisondotcombot" ? (
                ""
              ) : (
                <div className='contCommt'>
                  <div className='infoComment'>
                    <p className='authorCom'>{comment.author}</p>
                    <p className='timeAg'>
                      {moment.unix(comment.created).fromNow()}
                    </p>
                  </div>
                  <p>{comment.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
