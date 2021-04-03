import blogService from '../services/blogService';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGPOSTS':
      return [...action.data];
    case 'ADD_BLOGPOST':
      return [...state, action.data];
    case 'DELETE_BLOGPOST':
      return state.filter(blog => blog.id !== action.data);
    case 'LIKE_BLOGPOST':
      return state.map(blog => blog.id === action.data.id
        ? { ...blog, likes: action.data.likes }
        : blog);
    case 'ADD_COMMENT':
      return state.map(blog => blog.id === action.data.id
        ? { ...blog, comments: [...action.data.comments] }
        : blog);
    default:
      return state;
  }
};

export const initializeBlogposts = () => {
  return async dispatch => {
    const blogposts = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGPOSTS',
      data: blogposts,
    });
  };
};

export const addBlogpost = (content) => {
  return async dispatch => {
    const post = await blogService.create(content);
    dispatch({
      type: 'ADD_BLOGPOST',
      data: post,
    });
  };
};

export const removeBlogpost = (id) => {
  return async dispatch => {
    await blogService.deletePost(id);
    dispatch({
      type: 'DELETE_BLOGPOST',
      data: id,
    });
  };
};

export const likeBlogpost = (id, update) => {
  return async dispatch => {
    const updatedPost = await blogService.updatePost(id, update);
    dispatch({
      type: 'LIKE_BLOGPOST',
      data: updatedPost,
    });
  };
};

export const addComment = (id, content) => {
  return async dispatch => {
    const post = await blogService.createComment(id, content);
    dispatch({
      type: 'ADD_COMMENT',
      data: post,
    });
  };
};

export default blogReducer;
