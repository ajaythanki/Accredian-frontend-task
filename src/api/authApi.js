import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const userLogin = async (credentials) => {
  const {data} = await axios.post(`${baseURL}login`,credentials,{
    withCredentials:true,
  })
  return data;
};
const userSignup = async (credentials) => {
  const {data} = await axios.post(`${baseURL}signup`,credentials,{
    withCredentials: true,
  })
  return data;
};
const userLogout = async () => {
  const { data } = await axios.get(`${baseURL}logout`,{
    withCredentials:true
  });
  return data;
};
const userVerify = async ({verificationCode}) => {
  const {data} = await axios.post(`${baseURL}verify`, {verificationCode}, {
    withCredentials: true,
  })
  return data;
};

export {userLogin, userSignup, userVerify, userLogout};