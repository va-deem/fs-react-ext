import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  UsersTable,
  NamesTd,
} from '../styles/styledComponents';

const UserList = () => {
  const users = useSelector(state => state.users);

  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Users</h1>
      <UsersTable>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}>
            <NamesTd><Link to={`/user/${user.id}`}>{user.name}</Link></NamesTd>
            <td>{user.blogs.length}</td>
          </tr>)}
        </tbody>
      </UsersTable>
    </div>
  );
};

export default UserList;
