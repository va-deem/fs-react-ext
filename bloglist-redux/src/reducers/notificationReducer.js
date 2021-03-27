const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeout;
export const setNotification = (notification, time) => {
  return async dispatch => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: null,
      });
    }, time * 1000);
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    });
  };
};

export default notificationReducer;
