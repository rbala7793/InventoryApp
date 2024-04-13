import React, { useState } from 'react'
import styles from "./auth.module.css"
import {BiLogIn} from 'react-icons/bi'
import Card from '../../components/Card/card'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { UseDispatch, useDispatch } from 'react-redux';
 
import {validateEmail,registerUser} from "../../services/authService";
import { SET_LOGIN, SET_NAME } from '../../assets/redux/features/auth/authSlice';

const initialState={
    name:"",
    email:"",
    password:"",
    confirm_password:""
 }

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState(false); 
  const [formData,setFormData] = useState(initialState);
  const {name,email,password,confirm_password}=formData;

  const handleInputChange= (e) =>{

    const {name,value} = e.target;
  
    setFormData({...formData,[name]:value});


     
  }

  const register = async (e)=>{
    e.preventDefault();

    if(!name || !email || !password){
        return toast.error("Invalid Data")
    }

    if(!validateEmail(email)){
        return toast.error("Invalid Email")
    }

    if(password < 6 ){
        return toast.error("Password min 6 characters")
    }
    if(password !== confirm_password ){
        return toast.error("Password not matched")
    }

    const userData={
        name,email,password
    }

    setIsLoding(true)
    try {
        const data = await registerUser(userData);
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.name))
        navigate("/dashboard")
        setIsLoding(false)
    }catch(erroe){
         setIsLoding(false)
    }
   

    console.log(formData);
  }


  return (
    <div className={`container ${styles.auth}`}> 

     <Card>
        <div className={styles.form} >
            <div className='--flex-center'>
                <BiLogIn size={35} color="#999" />

            </div>
            <h2>Register</h2>
            <form onSubmit={register}>
                 <input value={name} onChange={handleInputChange} type="text" placeholder='Name' name='name'   ></input>
                <input  value={email} onChange={handleInputChange} type="text" placeholder='Email' name='email'   ></input>
                <input  value={password} onChange={handleInputChange} type="text" placeholder='Password' name='password'   ></input>
                <input  value={confirm_password} onChange={handleInputChange} type="text" placeholder='Confirm Password' name='confirm_password'   ></input>
                <button  type="submit" className='--btn --btn-primary --btn-block'>Login</button>
            </form> 
            

            <span className={styles.register}>
                <Link to="/">Home</Link>
                <p> &nbsp; Already have on account &nbsp; </p>
                <Link to="/Login">Login</Link>

            </span>

        </div>

     </Card>

    </div>
  )
}

export default Register