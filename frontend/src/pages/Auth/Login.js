import React from 'react'
import styles from "./auth.module.css"
import {BiLogIn} from 'react-icons/bi'
import Card from '../../components/Card/card'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}> 

     <Card>
        <div className={styles.form} >
            <div className='--flex-center'>
                <BiLogIn size={35} color="#999" />

            </div>
            <h2>Login</h2>
            <form>
                <input type="text" placeholder='email' name='email' required ></input>
                <input type="text" placeholder='password' name='password' required ></input>
                <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>
            </form> 
            <Link to="/forgetPassword">forget Password</Link>

            <span className={styles.register}>
                <Link to="/">Home</Link>
                <p> &nbsp; Dont have on account &nbsp; </p>
                <Link to="/register">Register</Link>

            </span>

        </div>

     </Card>

    </div>
  )
}

export default Login