"use client"
import UpdatePage from "@/app/(main)/author/[auid]/update/Update"

const Updatecom = ({data}) => {

  const dis=(value)=>{
//   console.log(value)
  document.getElementById("updatepage").style.display=value
  }

  return (
    <div id="updatepage">
      <UpdatePage data={data}  display={dis} />
    </div>
  )
}

export default Updatecom
