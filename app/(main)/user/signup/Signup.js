"use client";
import React,{useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const Signup = () => {
    const router=useRouter();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [msg,setMsg]=useState("");
    const submitHandler=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch("/api/user/signin",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email,password}),
            });
            const data=await response.json();
            setMsg(data.msg);
            if(data && data.success){
                router.push(`/user/signup/verification/${email}`);
            }
        }
        catch(err){
            setMsg("Error Loging in...");
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
                <p>Sign up</p>
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
                        <button type='submit'>Sign up</button>
                    </div>
                </form>
                {msg && <div className="user-msg">
                    <p>{msg}</p>
                </div>}
                <div className='user-options'>
                    <p>Already a user ?</p>
                    <Link href={'/user/login/'}>Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;
