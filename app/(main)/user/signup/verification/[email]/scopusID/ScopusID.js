"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ScopusID = ({email}) => {
    const [scopusID, setScopusID] = useState("");
    const [msg, setMsg] = useState("");
    const router=useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const changedEmail = email.replace("%40", "@");
            const response = await fetch("/api/user/signin/scopusID", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: changedEmail,scopusID: scopusID}),
            });
            const data = await response.json();
            setMsg(data.msg);
            if (data && data.success) {
                setTimeout(()=>{
                    router.push("/user/login");
                },3000);
            }
        }
        catch (err) {
            setMsg("Error Registering...");
        }
        setTimeout(() => {
            setMsg("");
        }, 3000);
    }
    return (
        <div>
            <div className='user-page'>
                <div className='login-page'>
                    <div style={{ display: "flex", marginBottom: "15px", marginLeft: "10px", fontSize: "40px", justifyContent: "start", alignItems: "start", gap: "4px" }}>
                        <p className="gradient-text">PU RIMS</p>
                        <p className="gradient-text" style={{ fontSize: "10px", letterSpacing: "1px" }}>beta</p>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className='user-field'>
                            <input required type="text" value={scopusID} onChange={(e) => setScopusID(e.target.value)} />
                            <label>Scopus ID</label>
                        </div>
                        <div className='user-button mt-5'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                    {msg && <div className="user-msg">
                        <p>{msg}</p>
                    </div>}
                    <div className='user-options'>
                        <p>Can't remember your code ? </p>
                        <Link href={'/user/login/'}>Here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScopusID
