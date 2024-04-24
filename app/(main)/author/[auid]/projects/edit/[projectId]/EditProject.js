"use client";
import Card from '@/components/UI/Card';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const  EditProject = ({ dept, author ,auid , projectData}) => {
    const router=useRouter();
    //co-pis
    const [copis,setCopis]=useState(projectData.copis);
    //custom input value
    const [custom,setCustom]=useState("");
    //custom select value
    const [temp,setTemp]=useState("");
    //most of the data
    const [project,setProject]=useState({
        title: projectData.title,
        status: projectData.status,
        dept: projectData.department,
        description: projectData.description,
        from: projectData.from,
        to: projectData.to,
        amount_allocated: projectData.amount_allocated,
        amount_received: projectData.amount_received,
        installment: projectData.installment,
        funding_agency: projectData.funding_agency,
        industry_partner: projectData.industry_partner,
        deliverables: projectData.deliverables,
    });
    //msg
    const [msg,setMsg]=useState("");
    //change data
    const changeHandler=(e)=>{
        const {name,value}=e.target;
        setProject((project)=>({
            ...project,[name]: value
        }));
    }
    //remove one co-pi
    const removeHandler=(value)=>{
        setCopis(copis.filter(item=>item.name!==value.name));
    }
    //add data to copi from temp
    const addHandler1=()=>{
        const user=author.filter((item)=>item._id===temp);
        const item=user[0];
        setCopis([...copis,
            {
                name: item.profile.lastName+", "+(item.profile.middleName?item.profile.middleName:"")+" "+item.profile.firstName,
                scopusID: item._id
            }
        ]);
        setCopis(copis.filter(function(item,index,inputArr){
            return inputArr.indexOf(item)==index;
        }));
        setTemp("");
    }
    //add data to copi from custom
    const addHandler2=()=>{
        setCopis([...copis,{name: custom}]);
        console.timeLog(copis);
    }
    //post fetch data
    const sendHanlder=async()=>{
        try{
            const principal=author.filter((item)=>item._id===auid);
            const item=principal[0];
            const res=await fetch("/api/project/edit",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    title: project.title,
                    status: project.status,
                    dept: project.dept,
                    description: project.description,
                    from: project.from,
                    to: project.to,
                    principal_name: item.profile.lastName+", "+(item.profile.middleName?item.profile.middleName:"")+" "+item.profile.firstName,
                    principal_scopusID: item._id,
                    amount_allocated: project.amount_allocated,
                    amount_received: project.amount_received,
                    installment: project.installment,
                    funding_agency: project.funding_agency,
                    industry_partner: project.industry_partner,
                    deliverables: project.deliverables,
                    copis: copis,
                    id: projectData._id,
                })
            })
            const data=await res.json();
            setMsg(data.msg);
            if(data && data.success){
                router.refresh();
                router.push(`/author/${auid}/projects`);
            }
        }catch(err){
            setMsg("Error adding project!");
        }
        setTimeout(()=>{
            setMsg("");
        },3000);
    }
    return (
        <main className="grid-12 max-w-7xl w-screen mx-auto ">
            <h2 className="col-span-12 self-stretch me-8">Edit project :</h2>
            <Card className="col-span-12 self-stretch me-10">
                <div className='project-form'>
                    <p>Details :</p>
                    <div className='project-flex'>
                        <div className='add-field'>
                            <input name='title' type='text' value={project.title} onChange={changeHandler} required></input>
                            <label>Title</label>
                        </div>
                        <div className='add-field'>
                            <select name='status' value={project.status} onChange={changeHandler} required>
                                <option selected hidden value={""}></option>
                                <option value={"ongoing"}>On going</option>
                                <option value={"completed"}>Completed</option>
                            </select>
                            <label>Status</label>
                        </div>
                    </div>
                    <div className='add-field'>
                        <textarea name='description' value={project.description} onChange={changeHandler} required rows={"4"} style={{ resize: "none" }}></textarea>
                        <label>Description</label>
                    </div>
                    <div className='add-field'>
                        <div className='add-field'>
                            <select name='dept' value={project.dept} onChange={changeHandler} required>
                                <option value={""} selected hidden></option>
                                {dept && dept.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                            <label>Sanctioned department</label>
                        </div>
                    </div>
                    <p>Duration :</p>
                    <div className='project-flex'>
                        <div className='add-field'>
                            <input name='from' type='month' value={project.from} onChange={changeHandler} required></input>
                            <label>From</label>
                        </div>
                        <div className='add-field'>
                            <input name='to' type='month' value={project.to} onChange={changeHandler} required></input>
                            <label>To</label>
                        </div>
                    </div>
                    <p>Co-principal Investigator Details:</p>
                    <div className='add-field'>
                        <div className={'text-box'}>
                                {copis && copis.map((item)=>(
                                    <div className="text-pill" value={item}>
                                        <span>{item.name}</span>
                                        <button onClick={()=>removeHandler(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                        </div>
                        <label>Co-principal Investigator Names</label>
                    </div>
                    {temp!=="custom_author" && <div className='add-merged'>
                        <div className='add-field'>
                            <select name='temp' value={temp} onChange={(e)=>setTemp(e.target.value)}>
                                <option selected value={""} hidden></option>
                                <option value={"custom_author"}>Custom Author</option>
                                {author && author.map((item)=>(
                                    <option value={item._id}>
                                        {item.profile.lastName+", "+(item.profile.middleName?item.profile.middleName:"")+" "+item.profile.firstName}
                                    </option>
                                ))}
                            </select>
                            <label>Authors</label>
                        </div>
                        <button className='add-merged-button' onClick={()=>addHandler1()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </div>}
                    {temp==="custom_author" && <div className='add-merged'>
                        <div className='add-field'>
                            <input type='text' value={custom} onChange={(e)=>setCustom(e.target.value)}></input>
                            <label>Custom Author's Name</label>
                        </div>
                        <button className='add-merged-button' onClick={()=>addHandler2()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </div>}
                    <p>Funding Details :</p>
                    <div className='project-flex'>
                        <div className='add-field'>
                            <input name='amount_allocated' value={project.amount_allocated} onChange={changeHandler} type='number' required></input>
                            <label>Amount Allocated (in INR)</label>
                        </div>
                        <div className='add-field'>
                            <input name='amount_received' value={project.amount_received} onChange={changeHandler} type='number' required></input>
                            <label>Amount Received (in INR)</label>
                        </div>
                        <div className='add-field'>
                            <select name='installment' value={project.installment} onChange={changeHandler} required>
                                <option value={""} selected hidden></option>
                                <option value={"no"}>No</option>
                                <option value={"yearly"}>Yearly</option>
                                <option value={"monthly"}>Monthly</option>
                            </select>
                            <label>Installment</label>
                        </div>
                    </div>
                    <div className='project-flex'>
                        <div className='add-field'>
                            <input name='funding_agency' type='text' value={project.funding_agency} onChange={changeHandler} required></input>
                            <label>Funding Agency</label>
                        </div>
                        <div className='add-field'>
                            <input name='industry_partner' type="text" value={project.industry_partner} onChange={changeHandler} required></input>
                            <label>Industry Partner</label>
                        </div>
                    </div>
                    <p>Deliverables Details :</p>
                    <div className='add-field'>
                        <textarea name='deliverables' value={project.deliverables} onChange={changeHandler} rows={4} style={{resize: "none"}} placeholder='eg. patents,tots,publication number etc.'></textarea>
                        <label>Deliverables</label>
                    </div>
                    <div className='add-form-div'>
                        <span>{msg}</span>
                        <div className='add-form-button'>
                            <button onClick={()=>router.push(`/author/${auid}/projects`)}>Cancel</button>
                            <button onClick={()=>sendHanlder()}>Update</button>
                        </div>
                    </div>
                </div>
            </Card>
        </main>
    )
}

export default  EditProject;
