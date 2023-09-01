
import React from "react";
import { useState } from "react";
import CommentLike from "./CommentLike";
import { TextField } from "@material-ui/core";

const Comments = () => {
  const comments = [1, 2, 3, 4, 5, 6];
  return (
    <div className="container comments">
      <div className="input-el">
      <TextField fullWidth variant='outlined' label = "Write a comment" />
        <button>Post</button>
      </div>
      {comments.map((val) => (
        <div className="comment-container" key={val}>
          <img className="user-img" src="/new-assets/testimonial-user.jpeg" />
          <div className="comment-info">
          <p className="comment-name">Lorem ipsum</p>
          <p className="comment">
            Lorem ipsum dolor sit amet. Ut enim debitis sit porro quos aut
            delectus dolorem aut consequatur sapiente ut soluta libero. Rem enim
            vitae qui vero velit qui accusamus temporibus. Ut nisi voluptas et
            dolores per Lorem ipsum dolor sit amet. Ut enim debitis sit porro
            quos aut delectus dolorem aut consequatur sapiente ut soluta libero.
            Rem enim vitae qui vero velit qui accusamus temporibus. Ut nisi
            voluptas et dolores per
          </p>
          <CommentLike/>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default Comments;
