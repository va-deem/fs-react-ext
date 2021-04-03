import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBlogpost, likeBlogpost } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useParams } from 'react-router-dom';
import CreateCommentForm from './CreateCommentForm';
import {
  LikesSpan,
  BlogWrapper,
  CommentsList,
} from '../styles/styledComponents';

const Blog = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(blog => blog.id === id);
  const user = useSelector(state => state.user);

  if (!blog) {
    return null;
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(removeBlogpost(id));
    } catch (e) {
      dispatch(setNotification('Error deleting blog post', 5));
    }
  };

  const handleAddLike = async (id) => {
    try {
      await dispatch(likeBlogpost(id, { ...blog, likes: blog.likes + 1 }));
    } catch (e) {
      dispatch(setNotification('Error updating post', 5));
    }
  };

  // get current user as author of freshly added post
  const userAdded = (userAuthor) => {
    if (userAuthor && typeof userAuthor !== 'object') {
      return <p>Added by: {user.name} ({user.username})</p>;
    }
    return <p>Added by: {blog.user.name} ({blog.user.username})</p>;
  };

  return (
    <div>
      <h1>{blog.title} </h1>
      <BlogWrapper>
        Author: {blog.author}
        <p>{blog.url}</p>
        <p>
          <LikesSpan>{blog.likes} likes </LikesSpan>
          <button onClick={() => handleAddLike(blog.id)}>like</button>
        </p>
        {blog.user && blog.user.username === user.username ? (<p>
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        </p>) : ''}
        {userAdded(blog.user)}
      </BlogWrapper>
      <h4>Comments</h4>
        <CreateCommentForm id={blog.id}/>
      <CommentsList>
      {blog.comments
        ? blog.comments.map(comment => <li key={comment}>{comment}</li>)
        : null}
      </CommentsList>
    </div>
  );
};

export default Blog;
