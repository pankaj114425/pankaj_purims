"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { signOut } from 'next-auth/react';

const Signout = () => {
    const router=useRouter();
    const clickHanlder1=()=>{
        router.back();
    }
    const clickHanlder2=()=>{
        signOut();
    }
  return (
    <div>
        <div className='user-page'>
            <div className='login-page'>
                <div style={{display: "flex",marginBottom:"15px",marginLeft:"10px",fontSize: "40px",justifyContent: "start",alignItems:"start",gap: "4px"}}>
					<p className="gradient-text">PU RIMS</p>
					<p className="gradient-text" style={{fontSize: "10px", letterSpacing: "1px"}}>beta</p>
				  </div>
                <div>
                    <div className='token-form'>
                      <p>Are you sure you want to log out?</p>
                    </div>
                    <div className='user-button' style={{display: "flex",justifyContent:"space-around"}}>
                        <button onClick={()=>clickHanlder1()} style={{backgroundColor: "red"}}>Cancel</button>
                        <button onClick={()=>clickHanlder2()}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signout
