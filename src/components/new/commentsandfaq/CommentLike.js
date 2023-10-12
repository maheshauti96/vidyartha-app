import React from 'react'
import { useState } from 'react'
import { ThumbDownAltOutlined, ThumbDownAltRounded, ThumbDownRounded, ThumbUpAltOutlined, ThumbUpAltRounded } from "@material-ui/icons";

const CommentLike = () => {

  const [liked, setLiked] = useState(null)
  return (
    
        <div className="comment-reaction">
            Was this comment helpful? <button onClick={() => setLiked(true)}>{ liked === true ? <ThumbUpAltRounded/> : <ThumbUpAltOutlined />}</button>{" "}
            <button onClick={() => setLiked(false)}>{ liked === false ? <ThumbDownAltRounded /> : <ThumbDownAltOutlined/>}</button>
            
          </div>
    
  )
}

export default CommentLike