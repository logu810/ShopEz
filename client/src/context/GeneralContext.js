import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');


  const [productSearch, setProductSearch] = useState('');

  const [cartCount, setCartCount] = useState(0);


  useEffect(()=>{
    fetchCartCount();
  }, [])

  const fetchCartCount = async() =>{
    const userId = sessionStorage.getItem('userId');
    if(userId){
      await axios.get('http://localhost:6001/fetch-cart').then(
        (response)=>{
          setCartCount(response.data.filter(item=> item.userId === userId).length);
        }
      )
    }
  }

  const handleSearch = () =>{
    navigate('#products-body')
  }


  
  
  
  const login = async () =>{
    try{
      const loginInputs = {email, password}
        await axios.post('http://localhost:6001/login', loginInputs)
        .then( async (res)=>{

          sessionStorage.setItem('userId', res.data._id);
            sessionStorage.setItem('userType', res.data.usertype);
            sessionStorage.setItem('username', res.data.username);
            sessionStorage.setItem('email', res.data.email);
            if(res.data.usertype === 'customer'){
                navigate('/');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            }
          }).catch((err) =>{
            alert("login failed!!");
            console.log(err);
          });
          
        }catch(err){
          console.log(err);
        }
      }
      
  const inputs = {username, email, usertype, password};

  const register = async () =>{
    try{
        await axios.post('http://localhost:6001/register', inputs)
        .then( async (res)=>{
            sessionStorage.setItem('userId', res.data._id);
            sessionStorage.setItem('userType', res.data.usertype);
            sessionStorage.setItem('username', res.data.username);
            sessionStorage.setItem('email', res.data.email);

            if(res.data.usertype === 'customer'){
                navigate('/');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            }

        }).catch((err) =>{
            alert("registration failed!!");
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }



  const logout = async () =>{
    
    sessionStorage.clear();
    for (let key in sessionStorage) {
      if (sessionStorage.hasOwnProperty(key)) {
        sessionStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }



  return (
    <GeneralContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype, productSearch, setProductSearch, handleSearch, cartCount}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider