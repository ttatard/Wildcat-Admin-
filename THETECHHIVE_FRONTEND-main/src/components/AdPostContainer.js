import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import Modal from "react-modal";
import "./AdContainer.css";
import CitLogo from "../assets/image/CitLogo.png";
import ThumbsUp from "../assets/image/t-up.png";
import ThumbsDown from "../assets/image/t-down.png";
import CommentsDialog from "./CommentsDialog";

Modal.setAppElement("#root");

const AdPostContainer = ({ posts, fetchPosts }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeletePost = (postId) => {
    setConfirmDelete(postId);
  };

  const confirmDeleteAction = () => {
    if (confirmDelete !== null) {
      axios.delete(`http://localhost:8080/api/posts/${confirmDelete}`)
        .then(response => {
          console.log('Post deleted:', response.data);
          fetchPosts(); // Refresh posts after deletion
          setConfirmDelete(null);
        })
        .catch(error => {
          console.error('Error deleting post:', error);
          setConfirmDelete(null);
        });
    }
  };

  const cancelDeleteAction = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="post-container2">
      {posts.map((post) => {
        const formattedDate = moment(post.createdAt).format('dddd, MMMM D, YYYY [at] h:mm A');
        return (
          <div key={post.id} className="post-card">
            <div className="card-container">
              <div className="name-container">
                <img src={CitLogo} alt="CIT logo" />
                <h5>CIT-University</h5>
                <small>{formattedDate}</small>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
              <div className="card-contents">
                <p>{post.caption}</p>
                {post.image && <img src={post.image} alt="Post" className="post-image" />}
              </div>
              <div className="footer-line" />
              <div className="footer-actions">
                <div className="footer-icons">
                  <button>
                    <img src={ThumbsUp} alt="Thumbs Up" />
                  </button>
                  <button>
                    <img src={ThumbsDown} alt="Thumbs Down" />
                  </button>
                </div>
                <div className="footer-comments">
                  <CommentsDialog />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Modal
        isOpen={confirmDelete !== null}
        onRequestClose={cancelDeleteAction}
        contentLabel="Confirm Delete"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="confirmation-dialog">
          <h2>Are you sure you want to delete this post?</h2>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={confirmDeleteAction}>Yes</button>
            <button className="cancel-button" onClick={cancelDeleteAction}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdPostContainer;
