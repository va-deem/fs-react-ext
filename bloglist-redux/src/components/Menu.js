import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/authReducer';

const Menu = () => {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const padding = {
    paddingRight: 5
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(logoutUser());
  };

  return (
    <div>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <span>{currentUser.name} logged-in {currentUser.id}</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Menu;
