"use client"
import React, { useState } from "react";
import Card from "@/components/UI/Card";

const ContactPage = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [subject,setSubject]=useState("");
    const [honey,setHoney]=useState("");
    const[message,setMessage]=useState("")
    const [msg,setMsg]=useState("");
    const sumbitHandler=async(e)=>{
      e.preventDefault();
      try{
        const res=await fetch("/api/contact/",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({name,email,subject,honey,message})
        });
        const data=await res.json();
        if(data && data.result===true){
          console.log('hello');
          setMsg("Message send successfully!");
          setEmail("");
          setMessage("");
          setHoney("");
          setName("");
          setSubject("");
        }else{
          setMsg("Error sending email!");
        }
      }catch(err){
        setMsg("Error sending email!")
      }
      setTimeout(()=>{
        setMsg("");
      },3000);
    }

  return (
    <main className="grid grid-cols-12">
    <div className=" flex flex-col items-center col-span-6 col-start-4 w-full ">
       <div className="flex justify-between w-full mt-6 gap-2">
      <div className="w-full">
        <input
          type="text"
          name="name"
          className="w-full h-[40px]  bg-zinc-900 pl-3 text-lg "
          id="name"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <input
          type="email"
          className="w-full h-[40px]  bg-zinc-900 pl-3 text-lg"
          name="email"
          id="email"
          placeholder="Your Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </div>
      </div>

      <div className="w-full my-5">
        <input
          type="text"
          className="w-full h-[40px] bg-zinc-900 pl-3 text-lg"
          name="subject"
          id="subject"
          placeholder="Subject"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <textarea
          className="w-full min-h-[220px] bg-zinc-900 pl-3 text-lg pt-2 resize-none"
          id="msg"
          name="message"
          rows="5"
          placeholder="Message"
          required
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          
        ></textarea>
      </div>
      <div className="w-full" style={{display: "none"}}>
        <textarea
          className="w-full min-h-[220px] bg-zinc-900 pl-3 text-lg pt-2 resize-none"
          id="msg"
          name="message"
          rows="5"
          placeholder="Message"
          required
          value={honey}
          onChange={(e)=>setHoney(e.target.value)}
          
        ></textarea>
      </div>
      <div className="my-5 rounded-lg border border-gray-300 bg-zinc-900 ">
        <button
          id="fetch"
          className=" h-[40px] px-3 text-lg"
          onClick={(e)=>sumbitHandler(e)}
        >
          Send Message
        </button>
      </div>
      {msg && <div className="user-msg">
                    <p>{msg}</p>
                </div>}
    </div>
    </main>
  );
};

export default ContactPage;