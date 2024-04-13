import React from 'react'
import styles from "./auth.module.css"
import {BiLogIn} from 'react-icons/bi'
import Card from '../../components/Card/card'
import { Link } from 'react-router-dom'

const Forget = () => {
  return (
    <div className={`container ${styles.auth}`}> 

     <Card>
        <div className={styles.form} >
            <div className='--flex-center'>
                <BiLogIn size={35} color="#999" />

            </div>
            <h2>Forget Password</h2>
            <form>
                 <input type="text" placeholder='Email' name='email' required ></input>
                
                <button type="submit" className='--btn --btn-primary --btn-block'>Get Reset Email</button>
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

export default Forget