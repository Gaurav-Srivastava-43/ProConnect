import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

//MANAGING CONTEXT FOR USER AUTHENTICATION
export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({children}) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const profilePic = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';
  const inputs = {username: username, email: email, password: password, profilePic: profilePic};
  
  const navigate = useNavigate();

  //LOGIN FUNCTIONALITY CONTEXT SETTING
  const login = async () =>{
    try{
      const loginInputs = {email: email, password: password}
        await axios.post('http://localhost:6001/login', loginInputs)
        .then( async (res)=>{
            console.log("FETCHED",res);
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('userId', res.data.user._id);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('profilePic', res.data.user.profilePic);
            localStorage.setItem('posts', res.data.user.posts);
            localStorage.setItem('followers', res.data.user.followers);
            localStorage.setItem('following', res.data.user.following);
            navigate('/');
        }).catch((err) =>{
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }

  //REGISTER FUNCTIONALITY CONTEXT SETTING
  const register = async () =>{
    try{
        await axios.post('http://localhost:6001/register', inputs)
        .then( async (res)=>{
          localStorage.setItem('userToken', res.data.token);
          localStorage.setItem('userId', res.data.user._id);
          localStorage.setItem('username', res.data.user.username);
          localStorage.setItem('email', res.data.user.email);
          localStorage.setItem('profilePic', res.data.user.profilePic);
          localStorage.setItem('posts', res.data.user.posts);
          localStorage.setItem('followers', res.data.user.followers);
          localStorage.setItem('following', res.data.user.following);  
          navigate('/');
        }).catch((err) =>{
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }

  //LOGOUT FUNCTIONALITY -> CONTEXT DELETION
  const logout = async () =>{
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    navigate('/landing');
  }

  return (
    <AuthenticationContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword}}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider;