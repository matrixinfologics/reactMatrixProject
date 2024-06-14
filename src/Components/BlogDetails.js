// src/components/pages/BlogDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import Header from './Header'; // Assuming Header component is in the same directory level
import Footer from './Footer'; // Assuming Footer component is in the same directory level

const BlogDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div className="loader"><img src="http://122.160.55.196:4344/matrixtraining/wp-content/uploads/2024/05/cupertino_activity_indicator_square_medium.gif" alt="Loading" /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <>
      <Header />
      <div className="blog-details container">
        <h2>{post.title.rendered}</h2>
        <p>Author: {post.author} - Date: {new Date(post.date).toLocaleDateString()}</p>
        <div>{parse(post.content.rendered)}</div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
