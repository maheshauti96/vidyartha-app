
import React from "react";
import { useState , useEffect } from "react";
import CommentLike from "./CommentLike";
import {
  createComment,
  getComments,
  isValidEmail,
} from "../../../services/service";

const Comments = ({setShowModal , place , comments , setComments}) => {

  async function fetchComments(){
    const commentsData = await getComments(place)
    setComments(commentsData.content)
  }
  useEffect(() => {
    fetchComments()
  } , [])
  return (
    <div className="container comments">
      <div className="write-comment-btn">
        <button onClick={() => setShowModal(true)}>Write a Comment</button>
      </div>
      {comments.map(({name , comment , email , rating , timestamp}) => (
        <div className="comment-container" key={timestamp}>
          <div className="comment-info">
          <p className="comment-name">{name}</p>
          <p className="comment">
            {comment}
          </p>
          </div>
          <CommentLike/>
        </div>
      ))}
      
    </div>
  );
};

export default Comments;
