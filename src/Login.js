import React from 'react'
import "./Login.css";
import Button from '@mui/material/Button';
import {aut,provider} from "./Firebase";
import {useStateValue} from "./StateProvider";
import { actionTypes } from './Reducer';
const Login = () => {
    const [{user},dispatch]=useStateValue();
    const signIn=()=>{
           aut.signInWithPopup(provider).then((result)=>{
               dispatch({
                   type:actionTypes.SET_USER,
                   user:result.user,
               })
           }).catch((e)=>{
               alert(e.message)
           })
    }
    
    return (
        <div className="login">
            <div className="login_container">
                <img   alt=""/>
                <div className="login_text">
                    <h1>Sign in to whatsapp</h1>
                    </div>
                  <Button type="submit" onClick={signIn}>Sign in with Google</Button>  
                </div>
        </div>
    )
}

export default Login
