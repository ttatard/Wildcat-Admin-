import React, { useState, useEffect } from "react";
import axios from "axios";
import AdNavBar from "../../components/AdNavBar";
import "./AdHome.css";
import AdPost from "../../components/AdPost";
import AdPostContainer from "../../components/AdPostContainer";

const AdHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:8080/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  const addPost = (newPost) => {
    axios.post('http://localhost:8080/api/posts', newPost, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response from server:', response.data);
      setPosts(prevPosts => [response.data, ...prevPosts]);
    })
    .catch(error => {
      console.error('Error adding post:', error);
    });
  };

  return (
    <div className="main-container">
      <header>
        <AdNavBar />
      </header>
      <main className="sub-container">
        <span className="wildcat-text">WILDCAT</span>
        <AdPost addPost={addPost} />
        <AdPostContainer posts={posts} fetchPosts={fetchPosts} />
      </main>
    </div>
  );
};

export default AdHome;
