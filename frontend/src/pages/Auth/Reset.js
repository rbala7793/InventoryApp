import React from 'react'
import styles from "./auth.module.css"
import {BiLogIn} from 'react-icons/bi'
import Card from '../../components/Card/card'
import { Link } from 'react-router-dom'

const Reset = () => {
  return (
    <div className={`container ${styles.auth}`}> 

     <Card>
        <div className={styles.form} >
            <div className='--flex-center'>
                <BiLogIn size={35} color="#999" />

            </div>
            <h2>Reset Password</h2>
            <form>
                 <input type="text" placeholder='Password' name='email' required ></input>
                 <input type="text" placeholder='Confirm Password' name='email' required ></input>
                
                <button type="submit" className='--btn --btn-primary --btn-block'>Reset Password</button>
            </form> 
            

            <span className={styles.links}>
                <p>
                <Link to="/"> - Home</Link>
                </p>
                
                <p> <Link to="/Login">- Login</Link></p>
                

            </span>

        </div>

     </Card>

    </div>
  )
}

export default Reset