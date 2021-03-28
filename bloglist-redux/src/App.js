import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import './App.css';
import Notification from './components/Notification';
import CreatePostForm from './components/CreatePostForm';
import Togglable from './components/Togglable';

import { initializeBlogposts } from './reducers/blogReducer';
import { loginUser, logoutUser, setUser } from './reducers/userReducer';

const App = () => {
  const currentUser = useSelector(state => state.user);
  const blogFormRef = useRef();

  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogposts());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    }

    dispatch(loginUser(user))
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(logoutUser())
  };

  if (!currentUser) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="Username"
              id="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="Password"
              id="password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>{currentUser.name} logged-in {currentUser.id}</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreatePostForm />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={currentUser} />
      )}
    </div>
  );
};

export default App;
