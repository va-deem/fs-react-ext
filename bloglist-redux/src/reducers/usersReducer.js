import userService from '../services/userService';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return [...action.data];
    default:
      return state;
  }
};

export const setUsers = (user) => {
  return async dispatch => {
    const users = await userService.getAllUsers();
    dispatch({
      type: 'SET_USERS',
      data: users,
    });
  };
};


export default usersReducer;
