"use client";
import React,{useState} from 'react';
import Link from 'next/link';
import {signIn, useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
    const session=useSession();
    const router=useRouter();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [msg,setMsg]=useState("");
    const submitHandler=async(e)=>{
        e.preventDefault();
        try{
            const result=await signIn("credential",{email,password,redirect: false});
            console.log(result);
            if(!result.error && result.ok){
                router.refresh();
                setMsg("Successfully Logged in");
            }else{
                setMsg("Invalid Log in");
            }
        }
        catch(err){
            setMsg("Error Loging in...");
            console.log(err);
        }
        setTimeout(()=>{
            setMsg("");
        },3000);
    }
    return (
        <div className='user-page'>
            <div className='login-page'>
                <div style={{display: "flex",marginBottom:"0px",marginLeft:"10px",fontSize: "40px",justifyContent: "start",alignItems:"start",gap: "4px"}}>
					<p className="gradient-text">PU RIMS</p>
					<p className="gradient-text" style={{fontSize: "10px", letterSpacing: "1px"}}>beta</p>
				</div>
                <p>Login</p>
                <form className='login-form' onSubmit={submitHandler}>
                    <div className='user-field'>
                        <input required type='text' value={email} onChange={e=>setEmail(e.target.value)}></input>
                        <label>Email</label>
                    </div>
                    <div className='user-field'>
                        <input required type='password' value={password} onChange={e=>setPassword(e.target.value)}></input>
                        <label>Password</label>
                    </div>
                    <div className='user-button'>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                {msg && <div className="user-msg">
                    <p>{msg}</p>
                </div>}
                <div className='user-options'>
                    <p>Don't have an account ?</p>
                    <Link href={'/user/signup'}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
