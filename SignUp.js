import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
export default function SignUp() {
    const navigate = useNavigate()
const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    // confirmpassword:"",
    dob:"",
    gender:"",
    contact:"",
    term :"false",
    img:null
})
const handleChange =(e)=>{
    setFormData(currData =>{
        return{
            ...currData,[e.target.name]:e.target.value
        }
    })
}

const handleFileChange = (e) => {
    // console.log("sdfasdgfsdg", e.target.files[0]);
    setFormData(currData => ({
        ...currData,
        img: e.target.files[0]  // Store the file object in formData
    }));
};


const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match!");
    }if (!formData.term) {
        alert("accept the terms and conditions.");
        return;
    }
    // console.log("formData",formData)
    // const formDataToSend = new FormData();  // Create FormData object
    //     // Object.keys(formData).forEach(key => {
    //     //     formDataToSend.append(key, formData[key]);
    //     // });

    // console.log("formDatatosend",formDataToSend)

    
        // const date=formData.dob.split("/")
        // formData.dob=`${date[2]}-${date[1]}-${date[0]}`
        try{
            const response = await axios.post('http://localhost:3001/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        alert("Registration successful!");
        localStorage.setItem('userId', response.data.id);
                navigate(`/profile`); 
                
            } catch (error) {
                console.error(error);
                alert("Email Already Exist");
            }
    }



    return (
        <div className="container">
            <h2 className="">Please Signup</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="firstName">First Name</label>
                        <input type="text" required onChange={handleChange} class="form-control" name="firstName" id="firstName" value={formData.firstName} placeholder="firstname" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lastName">Last Name</label>
                        <input type="text" required onChange={handleChange} class="form-control" name="lastName" id="lastName" value={formData.lastName} placeholder="lastname" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email"  required onChange={handleChange} class="form-control" name="email" id="email" value={formData.email} placeholder="email" />
                </div>
              
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" required onChange={handleChange} class="form-control" name="password" id="password" value={formData.password} placeholder="password" />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="password">Confirm Password</label>
                    <input type="password" required onChange={handleChange} class="form-control" name="confirmpassword" id="confirmpassword" value={formData.confirmpassword} placeholder="confirm password" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="dob">DOB</label>
                        <input type="date" required onChange={handleChange} class="form-control" name="dob" value={formData.dob} id="dob" />
                    </div>
                    <div className="form-group">
                    <label>Gender</label>
                    <div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Female</label>
                        </div>
                    </div>
                

                    </div>
                    <div class="form-group col-md-2">
                        <label for="contact">Contact Number</label>
                        <input type="text" required maxLength={10} onChange={handleChange} class="form-control" value={formData.contact} name="contact" id="contact" />
                    </div>
                </div>   
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">Upload Img</label>
                    <input className="form-control" type="file" id="img" name="img" onChange={handleFileChange} />
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" required type="checkbox" name="term" id="term" />
                        <label class="form-check-label" for="term">
                            Accept t&c
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary">Sign in</button>
                
            </form>
            <Link to="/profile">Profile</Link>
            {/* <Outlet/> */}
        </div>
    )
}