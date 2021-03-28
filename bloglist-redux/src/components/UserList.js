import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserList = () => {
  const users = useSelector(state => state.users);

  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}>
            <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
