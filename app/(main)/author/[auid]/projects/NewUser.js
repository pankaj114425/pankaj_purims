"use client";
import React,{useState} from 'react';
import Card from '@/components/UI/Card';
import CardContent from '@/components/UI/CardContent';
import Link from "next/link";

const NewUser = ({ session, newUser, otherProject }) => {
    const project = otherProject;
    console.log(session);
    const { result, count } = otherProject;
    const [data,setData]=useState([]);
    const checkData=(id)=>{
        let temp=false;
        for(let i=0;i<data.length;i++){
            if(data[i]?.id===id){
                temp=true;
            }
        }
        return temp;
    }
    const addData=(e,id)=>{
        if(e.target.checked){
            setData([...data,{id: id,role: ""}]);
        }else if(!e.target.checked){
            setData(data=>data.filter(item=>item.id!==id));
        }
    }
    const addRole=(e,id)=>{
        if(e.target.value){
            const temp=data;
            temp.map(item=>{
                if(item.id===id){
                    item.role=e.target.value;
                }
            });
            setData(temp);
        }
    }
    const sendData=async()=>{
        const res=await fetch("/api/project/new",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({data: data,auid: session?.scopusID})
        });
        const value=await res.json();
        if(value?.success){
            window.location.reload();
        }
    }
    return (
        <main className="grid-12 max-w-7xl w-screen mx-auto ">
            <div className="col-span-12 self-stretch me-8">
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>
                            {project && count == 0
                                ? "Projects: No Projects Found!"
                                : `Select project's you were a part of....`}
                        </h2>
                    </div>
                </CardContent>
                {result &&
                    result.map((project, i) => (
                        <Card key={i} className="my-5">
                            <CardContent className="flex flex-row p-2 py-4">
                                <div className="flex-1">
                                    <div className="border-l-4 pl-3">
                                        <div className="text-sm uppercase">{project.status}</div>
                                        <div
                                            className="doc-title"
                                            style={{
                                                display: "flex",
                                                alignContent: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Link href={`/projects/${project._id}`} className="link text-3xl font-bold">
                                                {project.title}
                                            </Link>
                                            <div className="text-1xl" style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "20px" }}>
                                                <input onClick={(e)=>addData(e,project._id)} type='checkbox'></input>
                                                {checkData(project._id) && <select onChange={e=>addRole(e,project._id)}>
                                                    <option hidden value={""}>Role</option>
                                                    <option value={"Pi"}>Pi</option>
                                                    <option value={"Co-Pi"}>Co-Pi</option>
                                                </select>}
                                            </div>
                                        </div>
                                        <div>
                                            <Link
                                                className="link"
                                                href={`/dept/${project.department}`}
                                            >
                                                {project.department}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-4" style={{ height: "20px", overflow: "hidden", textOverflow: "ellipsis" }}>{project.description}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <button onClick={()=>sendData()}>Save</button>
            </div>
        </main>
    )
}

export default NewUser