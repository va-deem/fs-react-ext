import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import blogService from './services/blogService';
import loginService from './services/loginService';
import './App.css';
import Notification from './components/Notification';
import CreatePostForm from './components/CreatePostForm';
import Togglable from './components/Togglable';

import { initializeBlogposts } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
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
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification(`Wrong credentials`, 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
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
      <p>{user.name} logged-in {user.id}</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreatePostForm />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  );
};

export default App;
