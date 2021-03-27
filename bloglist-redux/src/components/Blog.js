import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBlogpost, likeBlogpost } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleAddLike: PropTypes.func,
    handleDelete: PropTypes.func,
    user: PropTypes.object,
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [blogVisible, setBlogVisible] = useState(false);

  const showWhenVisible = { display: blogVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeBlogpost(id));
    } catch (e) {
      dispatch(setNotification(`Error deleting blog post`, 5));
    }
  }

  const handleAddLike = async (id) => {
    try {
      await dispatch(likeBlogpost(id));
    } catch (e) {
      dispatch(setNotification(`Error updating post`, 5));
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {blogVisible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='drop-section'>
        <p>{blog.url}</p>
        <p>
          <span className="likes-number">{blog.likes}</span>
          <button onClick={() => handleAddLike(blog.id)}>like</button>
        </p>
        <p>{blog.author}</p>
        {blog.user && blog.user.username === user.username ? (<p>
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        </p>) : ''}
      </div>
    </div>
  );
};

export default Blog;
