import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch posts using Axios
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/posts', {
                    params: {
                        per_page: 6,
                        _embed: true
                    }
                });
                setPosts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="loader"><img src="http://122.160.55.196:4344/matrixtraining/wp-content/uploads/2024/05/cupertino_activity_indicator_square_medium.gif" alt="Loading" /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <section className="page_title">
            <div className="container">
              <div className="row">
                {/* Render the page title */}
              
                  <>
                  <h1 className="page-title">Blog</h1>
                  <div><div className='heading-bottom-line'></div></div>
                  </>
                
              </div>
            </div>
          </section>
          
            <section className="blog-list-section">
                <div className="container">
                <div className="row">
                    {posts.map(post => {
                        const featuredMedia = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
                        const featuredImageUrl = featuredMedia ? featuredMedia.source_url : '';

                        return (
                                  <> 
                            <div className="col-md-4 mb-4" key={post.id}>
                                <div className="card h-100">
                                    {featuredImageUrl && (
                                        <img src={featuredImageUrl} alt={featuredMedia.alt_text || post.title.rendered} className="card-img-top" />
                                    )}
                                    <div className="card-body">
                                        <h3 className="card-title">{post.title.rendered}</h3>
                                        <div className="card-text" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                        <Link to={`/posts/${post.id}`} className="btn btn-primary mt-3">Read More</Link>
                                    </div>
                                </div>
                            </div>
                            </>
                        );
                    })}
                </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Blog;
