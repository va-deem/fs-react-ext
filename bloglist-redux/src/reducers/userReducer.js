import loginService from '../services/loginService';
import blogService from '../services/blogService';
import { setNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'LOGIN_USER':
      return action.data;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const loginUser = (credentials) => {
  return async dispatch => {
    let user = null;
    try {
      user = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
    } catch (e) {
      dispatch(setNotification(`Wrong credentials`, 5));
    }

    dispatch({
      type: 'LOGIN_USER',
      data: user,
    });
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT_USER',
    });
  };
};


export default userReducer;
