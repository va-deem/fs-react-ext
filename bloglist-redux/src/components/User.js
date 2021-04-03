import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const users = useSelector(state => state.users);
  const user = users.find(user => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>added blogs</p>
      <ul>
        {user.blogs.map(blog => <li key={blog.title}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default User;
