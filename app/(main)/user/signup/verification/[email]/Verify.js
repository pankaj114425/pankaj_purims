"use client";
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';

const Verify = ({ email }) => {
  const [token, setToken] = useState(new Array(4).fill(""));
  const [msg, setMsg] = useState("");
  const [warn,setWarn]=useState("The account will get deleted after 3 days if verification is not done!");
  const router = useRouter();
  const inputRefs = useRef([]);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    setTimeout(() => {
      setWarn("");
    }, 10000);
  }, []);
  const hanldeChange = (e, index) => {
    setTimeout(() => {
      setWarn("");
    }, 2000);
    const length=4;
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...token];
    // allow only one input
    newOtp[index] =value.substring(value.length - 1);
    setToken(newOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  }
  const handleKeys = (e, index) => {
    if (e.key === "Backspace" && !token[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const otp = token.join("");
      console.log(otp);
      const changedEmail = email.replace("%40", "@");
      const response = await fetch("/api/user/signin/verification", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: changedEmail, token: otp }),
      });
      const data = await response.json();
      setMsg(data.msg);
      if (data && data.success) {
        router.push(`/user/signup/verification/${email}/scopusID`);
      }
    }
    catch (err) {
      setMsg("Error Verifying...");
    }
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }
  const askHandler = async () => {
    try {
      const changedEmail = email.replace("%40", "@");
      const response = await fetch("/api/user/signin/verify", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: changedEmail }),
      });
      const data = await response.json();
      setMsg(data.msg);
    }
    catch (err) {
      setMsg("Error...");
    }
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }
  return (
    <div>
      <div className='user-page2'>
      {warn && <div className="user-msg">
          <p>{warn}</p>
        </div>}
        <div className='login-page'>
          <div style={{ display: "flex", marginBottom: "15px", marginLeft: "10px", fontSize: "40px", justifyContent: "start", alignItems: "start", gap: "4px" }}>
            <p className="gradient-text">PU RIMS</p>
            <p className="gradient-text" style={{ fontSize: "10px", letterSpacing: "1px" }}>beta</p>
          </div>
          <form onSubmit={submitHandler}>
            <div className='token-form'>
              {token.map((data, index) => {
                return (
                  <input
                    ref={(input) => inputRefs.current[index] = input}
                    type='text'
                    maxLength={1}
                    key={index}
                    value={data}
                    onChange={e => hanldeChange(e, index)}
                    onKeyDown={e => handleKeys(e, index)}
                  />
                )
              })}
            </div>
            <div className='user-button'>
              <button type='submit'>Verify OTP</button>
            </div>
          </form>
          {msg && <div className="user-msg">
            <p>{msg}</p>
          </div>}
          <div className='user-options'>
            <p>Didn't receive a code ?</p>
            <button onClick={() => askHandler()} style={{ color: "blue" }}>Resend</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify;
