"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Card from "@/components/UI/Card";

const UpdatePage = ({ data, display }) => {
  const router = useRouter();
  const [authData, setAuthData] = useState(data);
  const [selectedImage, setSelectedImage] = useState(data.img);
  useEffect(() => {
    setAuthData(data);
  }, [data]);
  const handleInputChange = (fieldName, value) => {
    setAuthData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const [msg,setMsg]=useState("");

  const handleImageChange = async (e) => {

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setSelectedImage(base64);
    setAuthData((prevData) => ({
      ...prevData,
      img: base64 ? base64 : ""
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("llm", authData.llm);
    formData.append("img", selectedImage);
    formData.append("scopusID", authData.scopusID);

    // const formDataObject = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });
    // console.log("FormData Object:", formDataObject);
    try {
      const result = await axios
        .post("/api/update", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then((res) => res.data);
        setMsg(result.message);
      if (result.success) {
        // router.refresh();
        router.push(`/author/${data.scopusID}`);
        // setTimeout(()=>{
        //   window.location.reload();
        // },2000);
      } 
    } catch (error) {
      console.log(error);
    }
    setTimeout(()=>{
      setMsg("")
    },2000);
  };

  // Use useServer to expose the function to the server side



  return (
    <main className="grid-12 max-w-7xl w-screen mx-auto ">
      <h2 className="col-span-12 self-stretch me-8">Profile:</h2>
      <Card className="col-span-12 self-stretch me-10">
        <div className='project-form'>
          <p>Edit: </p>
          <div className="div-center">
            <span>Profile Image</span>
            {authData.img ? (
              <img
                src={authData.img}
                alt="Selected"
                className="profile-img"
              />
            ) : (
              <div className="profile-img">
                <img
                src={'/user_avatar.jpeg'}
                style={{objectFit: "fill"}}
                alt="Selected"
                className="profile-img"
              />
              </div>
            )}
          </div>
          <div className='project-flex'>
            <div className='add-field'>
              <textarea rows={3} style={{ resize: "none" }} name='title' type='text' value={authData.llm ? authData.llm : ""} onChange={(e) => handleInputChange("llm", e.target.value)} required></textarea>
              <label>Description</label>
            </div>
          </div>
          <div className='project-flex'>
            <div className='add-field mt-2'>
              <input
                type="file"
                id="profile_img"
                name="profile_img"
                accept='.png. .jpeg , .jpg '
                onChange={(e) => e.target.files.length > 0 && handleImageChange(e)}
              />
              <label>Change Image</label>
            </div>
          </div>
          <div className="div-right">
            <div>{msg}</div>
            <div>
              <button
                type="button"
                id="closebutoon"
                onClick={() => {
                  router.push(`/author/${data.scopusID}`);
                }}
                className="profile-edit-btn"
              >
                Back
              </button>
              <button
                type="submit"
                className="profile-edit-btn ms-4"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default UpdatePage;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

//onClick={() => display("none")
