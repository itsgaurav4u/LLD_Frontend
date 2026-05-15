import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
  })
  const [error, setError] = useState({});
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    var error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.name?.trim() === "") {
      error.name = "Enter name";
    }
    if (formData.email?.trim() === "") {
      error.email = "Enter email";
    } else if (!emailRegex.test(formData.email)) {
      error.email = "Enter valid email"
    }
    if (Object.keys(error).length === 0) {
      alert('Form Submitted', formData);
      setFormData({
        name: '',
        email: '',
        mobileNo: '',
        password: '',
      });
    }

    setError(error)
  }
  console.log(error);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name='name'
          value={formData.name}
          onChange={handleChange}
          style={{ border: '1px solid black' }}
        />
        <p>{error.name}</p>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name='email'
           value={formData.email}
          onChange={handleChange}
          style={{ border: '1px solid black' }}
        />
        <p>{error.email}</p>
      </div>
      <div>
        <label>Mobile No</label>
        <input
          type="number"
          name='mobileNo'
          onChange={handleChange}
          style={{ border: '1px solid black' }}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name='password'
          onChange={handleChange}
          style={{ border: '1px solid black' }}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}
export default App;