import React, { useState } from "react";
import {
  createComment,
  getComments,
  isValidEmail,
} from "../../../services/service";
import { CloseOutlined } from "@material-ui/icons";

const RATINGS = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];
const CommentModal = ({ place, showModal, setShowModal, setComments }) => {
  const [rating, setRating] = useState("");
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState({ status: "", message: "" });

  function closeModal(){
    setError({
      status : "",
      message : ""
    })
    setShowModal(false)
    setRating("")
  }

  async function submitComment() {
    if (name === "") {
      setError({
        status: "error",
        message: "Name required for comment",
      });
      return;
    }
    if (!isValidEmail(email)) {
      setError({
        status: "error",
        message: "Email required for comment",
      });
      return;
    }

    if (rating === "") {
      setError({
        status: "error",
        message: "Rating required for comment",
      });
      return;
    }

    if (comment === "") {
      setError({
        status: "error",
        message: "comment required for comment",
      });
      return;
    }
    const createdComment = await createComment({
      name,
      email,
      rating: RATINGS[rating],
      comment,
      place,
    });
    const allComments = await getComments(place);
    setComments(allComments.content)
    
    setError({
      status: "success",
      message: createdComment,
    });

    setTimeout(() => {
      setError({
        status : "",
        message : ""
      })
      setShowModal(false)
      
    } , 2000)
  }

  return (
    <>
      { showModal && <div className="comment-modal-container">
        <div
          onClick={closeModal}
          className="modal-backdrop"
        ></div>
        <div className="comment-modal">
          <div onClick={closeModal} className="close" >
            <CloseOutlined color="#1D4F5A" /> 
          </div>
          <h2>Your Comment</h2>
          <div className="textfield">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder=""
              type="text"
            />
            <label>Name*</label>
          </div>
          <div className="textfield">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder=""
              type="email"
            />
            <label>Email*</label>
          </div>
          <div className="comment-textarea">
            <textarea
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Please write your comment here!*"
              rows={4}
            ></textarea>
          </div>
          <div className="rating">
            <p>Rate your experience!*</p>
            <div className="rating-stars">
              {RATINGS.map((ratingVal, index) => {
                return (
                  <img
                    className={`
            ${hover >= index ? "hovered" : ""}  
            ${rating >= index ? "rated" : ""}`}
                    onMouseOver={() => setHover(index)}
                    onClick={() => setRating(index)}
                    src={`/new-assets/${
                      index <= rating || index <= hover ? "filled" : "empty"
                    }-star.svg`}
                  />
                );
              })}
            </div>
          </div>
          <p className={"error-message " + error.status}>{error.message}</p>
          <button onClick={submitComment} className="submit-btn">
            Submit Comment
          </button>
        </div>
      </div>}
    </>
  );
};

export default CommentModal;
