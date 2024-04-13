import axios from 'axios';

import {toast} from "react-toastify";


console.log(process.env.REACT_APP_BACKEND_URL);



export const REACT_APP_BACKEND_URL=process.env.REACT_APP_BACKEND_URL;



export const validateEmail = (email) =>{
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
export const registerUser = async (userData)=>{
      try{
         const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/users/register`,userData,{withCredentials:true})
         
         if(response.statusText=="OK"){
           toast.success("Success");
         }

         return response.data;

        }catch(error){

            const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            toast.error(message);
      }

}