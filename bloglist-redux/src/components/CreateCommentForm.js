import React from 'react';
import { addComment } from '../reducers/blogReducer';
import { setNotification} from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import {
  InlineForm,
  InlineInput,
  InlineFormLabel,
} from '../styles/styledComponents';

const CreateCommentForm = ({id}) => {
  const dispatch = useDispatch();

  const addCommentToBlog = (event) => {
    event.preventDefault();

    const commentObj = { comment: event.target.comment.value };

    event.target.comment.value = '';

    if (commentObj.comment.length > 0) {
      dispatch(addComment(id, commentObj));
      dispatch(setNotification(`you added comment '${commentObj.comment}'`, 5));
    }
  };

  return (
    <InlineForm onSubmit={addCommentToBlog}>
      <InlineFormLabel>Leave a comment:</InlineFormLabel>
      <InlineInput type="text" name="comment" />
      <button>add</button>
    </InlineForm>
  );
};

export default CreateCommentForm;
