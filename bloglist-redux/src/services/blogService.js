import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updatePost = async (id, update) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, update, config);
  return response.data;
};

const deletePost = async id => {
  const config = {
    headers: { Authorization: token },
  };

  return axios.delete(`${baseUrl}/${id}`, config);
};

const createComment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject);
  return response.data;
};

export default { getAll, create, setToken, updatePost, deletePost, createComment};
