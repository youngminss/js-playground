import { API_URL } from "../common/constants.js";

const request = async ({ url, options = {}, errorMessage = "default error msg" }) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    return new Error(errorMessage);
  }

  return res.json();
};

// TodoList API
export const getTodo = (username, delay) => {
  const url = delay ? `${API_URL}${username}?delay=${delay}` : `${API_URL}${username}`;

  return request({
    url: url,
    errorMessage: "getTodo API failure !",
  });
};

export const postTodo = (username, content) => {
  const url = `${API_URL}${username}`;

  const todoObj = {
    _id: Date.now(),
    content: content,
    isCompleted: false,
  };

  return request({
    url: url,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoObj),
    },
    errorMessage: "postTodo API failure !",
  });
};

export const deleteTodo = (username, todoId) => {
  const url = `${API_URL}${username}/${todoId}`;

  return request({
    url: url,
    options: {
      method: "DELETE",
    },
    errorMessage: "deleteTodo API failure !",
  });
};

export const deleteTodoAll = (username) => {
  const url = `${API_URL}${username}/all`;

  return request({
    url: url,
    options: {
      method: "DELETE",
    },
    errorMessage: "deleteTodoAll API failure !",
  });
};

export const changeTodoCompleted = (username, todoId) => {
  const url = `${API_URL}${username}/${todoId}/toggle`;

  return request({
    url: url,
    options: {
      method: "PUT",
    },
    errorMessage: "changeTodoCompleted API failure !",
  });
};

// Users API
export const getUsers = () => {
  const url = `${API_URL}users`;

  return request({
    url: url,
    errorMessage: "changeTodoCompleted API failure !",
  });
};
