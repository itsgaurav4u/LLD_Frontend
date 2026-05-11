import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorList = {};
    if (!formData.name.trim()) {
      errorList.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errorList.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errorList.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      errorList.password = "Password is required";
    }else if(
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(formData.password)
    ){
      errorList.password = "Write strong password"
    }
    if(!formData.mobile.trim()){
      errorList.mobile="Mobile number required"
    }else if(
      !/^\+?[1-9][0-9]{7,14}$/.test(formData.mobile)
    ){
      errorList.mobile="Write valid number"
    }
    setError(errorList);
    if(Object.keys(errorList).length===0){
      console.log("Form Submitted", formData);
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="mr-2">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={handleChange}
          className="border border-soild rounded-md" />
        <p>{error.name}</p>
      </div>
      <div>
        <label className="mr-2">Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={handleChange}
          className="border border-soild rounded-md" />
        <p>{error.email}</p>
      </div>
      <div>
        <label className="mr-2">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleChange}
          className="border border-soild rounded-md" />
          <p>{error.password}</p>
      </div>
      <div>
        <label className="mr-2">Mobile</label>
        <input
          type="text"
          placeholder="Enter Mobile"
          name="mobile"
          onChange={handleChange}
          className="border border-soild rounded-md" />
           <p>{error.mobile}</p>
      </div>
      <button type="submit" className="border border-soild rounded-md">Submit</button>
    </form>
  )
}

export default App
