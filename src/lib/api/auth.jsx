import axios from 'axios';

export const signup = async ({ id, email, username, password }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/user/signup`,
    {
      id,
      email,
      username,
      password,
    },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );
  return response.data;
};

export const check = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/user/check`,
    {
      id,
    },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );
  return response.data;
};

export const kakaoLogin = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/user/oauth/kakao`,
    {
      data,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const googleLogin = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/user/oauth/google`,
    { data },
    { withCredentials: true },
  );
  return response.data;
};

export const login = async ({ id, password }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/user/login`,
    { id, password },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );
  return response.data;
};

export const update = async ({
  email,
  username,
  oldpassword,
  newpassword,
  token,
}) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_SERVER_URI}/user/updateinfo`,
    { email, username, oldpassword, newpassword },
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
    { withCredentials: true },
  );
  return response.data;
};

export const logout = async (token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/user/logout`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
  return response;
};

export const withdraw = async (token) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER_URI}/user/withdrawal`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
    { withCredentials: true },
  );
  return response.data;
};

export const info = async (token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URI}/user/getuserinfo`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
    { withCredentials: true },
  );
  return response.data;
};
