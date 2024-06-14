import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeaturedPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts using Axios
        axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/posts', {
            params: {
                per_page: 6,
                _embed: true
            }
        })
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <section className="container my-5">
            <h2 className="text-center mb-4">Featured Posts</h2>
            <div className="row">
                {posts.map(post => {
                    const featuredMedia = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
                    const featuredImageUrl = featuredMedia ? featuredMedia.source_url : '';

                    return (
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
                    );
                })}
            </div>
        </section>
    );
}

export default FeaturedPost;
