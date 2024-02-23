import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comment = ({ comment, onEdit, onDelete, onApprove, onReject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    const editedDate = new Date();
    onEdit(editedComment, editedDate);
    setIsEditing(false);
    toast.success("Comment edited successfully");
  };

  const handleCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  return (
    <div className={`item ${comment.status === "rejected" ? "rejected" : ""}`}>
      {isEditing ? (
        <div>
          <textarea
            value={editedComment}
            onChange={handleCommentChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSaveEdit();
              }
            }}
          />
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
            {comment.status === "pending" && (
              <>
                <button
                  className="approveBtn"
                  onClick={() => onApprove(comment)}
                >
                  Approve
                </button>
                <button className="rejectBtn" onClick={() => onReject(comment)}>
                  Reject
                </button>
              </>
            )}
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
      const newComment = { text: comment, date: new Date(), status: "pending" };
      setCommentsList([...commentsList, newComment]);
      setComment("");
      toast.success("Comment added successfully");
    }
  };

  const handleEditComment = (editedText, index, editedDate) => {
    const updatedComments = [...commentsList];
    updatedComments[index].text = editedText;
    updatedComments[index].date = editedDate;
    setCommentsList(updatedComments);
  };

  const handleDeleteComment = (deletedComment) => {
    const updatedComments = commentsList.filter(
      (comment) => comment !== deletedComment
    );
    setCommentsList(updatedComments);
    toast.error("Comment deleted successfully");
  };

  const handleApproveComment = (commentToApprove) => {
    const updatedComments = commentsList.map((comment) =>
      comment === commentToApprove
        ? { ...comment, status: "approved" }
        : comment
    );
    setCommentsList(updatedComments);
    toast.success("Comment approved successfully");
  };

  const handleRejectComment = (commentToReject) => {
    const updatedComments = commentsList.filter(
      (comment) => comment !== commentToReject
    );
    setCommentsList(updatedComments);
    toast.error("Comment rejected and deleted");
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
                onEdit={(editedText, editedDate) =>
                  handleEditComment(editedText, index, editedDate)
                }
                onDelete={(deletedComment) =>
                  handleDeleteComment(deletedComment)
                }
                onApprove={(commentToApprove) =>
                  handleApproveComment(commentToApprove)
                }
                onReject={(commentToReject) =>
                  handleRejectComment(commentToReject)
                }
              />
            </li>
          ))}
        </ul>
        <textarea
          placeholder="Write your comment here..."
          value={comment}
          onChange={handleCommentChange}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleAddComment();
            }
          }}
        />
        <br />
        <button className="addComment" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CommentComponent;
