import React, { useState, useEffect } from "react";

const Comment = ({ comment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    onEdit(editedComment);
    setIsEditing(false);
  };

  const handleCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  return (
    <div className="item">
      {isEditing ? (
        <div>
          <textarea value={editedComment} onChange={handleCommentChange} />
          <br />
          <button className="save" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="cancel" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="item">
          <div>
            <p>{comment.text}</p>
            <p style={{ fontStyle: "italic", fontSize: "12px", color: "#888" }}>
              {comment.date.toLocaleString()}
            </p>
          </div>
          <div className="btn">
            <button className="editBtn" onClick={handleEditClick}>
              Edit
            </button>
            <button className="deleteBtn" onClick={() => onDelete(comment)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CommentComponent = () => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setCommentsList(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentsList));
  }, [commentsList]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setCommentsList([...commentsList, { text: comment, date: new Date() }]);
      setComment("");
    }
  };

  const handleEditComment = (editedText, index) => {
    const updatedComments = [...commentsList];
    updatedComments[index].text = editedText;
    setCommentsList(updatedComments);
  };

  const handleDeleteComment = (deletedComment) => {
    const updatedComments = commentsList.filter(
      (comment) => comment !== deletedComment
    );
    setCommentsList(updatedComments);
  };

  return (
    <div className="comments">
      <div className="comments__container">
        <h2>Comments</h2>
        <ul className="comments__list">
          {commentsList.map((comment, index) => (
            <li className="comments__list__item" key={index}>
              <Comment
                comment={comment}
                onEdit={(editedText) => handleEditComment(editedText, index)}
                onDelete={(deletedComment) =>
                  handleDeleteComment(deletedComment)
                }
              />
            </li>
          ))}
        </ul>
        <textarea
          placeholder="Write your comment here..."
          value={comment}
          onChange={handleCommentChange}
        />
        <br />
        <button className="addComment" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentComponent;
