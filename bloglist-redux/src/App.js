import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import User from './components/User';
import UserList from './components/UserList';
import './App.css';
import Notification from './components/Notification';
import CreatePostForm from './components/CreatePostForm';
import Togglable from './components/Togglable';

import { initializeBlogposts } from './reducers/blogReducer';
import { loginUser, setUser } from './reducers/authReducer';
import { setUsers } from './reducers/usersReducer';
import Blog from './components/Blog';
import Menu from './components/Menu';

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

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    };

    dispatch(loginUser(user));
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
    <Router>
      <div>
        <Notification />
        <Menu />
        <h2>Blog app</h2>
        <Switch>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:id">
            <User />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/">
            <h1>Blogs</h1>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <CreatePostForm />
            </Togglable>
            {blogs.map(blog =>
              <p key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
