import React from 'react';
import { addBlogpost } from '../reducers/blogReducer';
import { setNotification} from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const CreatePostForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const blogpost = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    [...event.target.elements].forEach(el => {
      el.value = '';
    })

    if (blogpost.title.length > 0) {
      dispatch(addBlogpost(blogpost));
      dispatch(setNotification(`you added message '${blogpost.title}'`, 5));
    }
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input type="text" name="title" />
      </div>
      <div>
        author
        <input type="text" name="author" />
      </div>
      <div>
        url
        <input type="text" name="url" />
      </div>
      <button>create</button>
    </form>
  );
};

export default CreatePostForm;
