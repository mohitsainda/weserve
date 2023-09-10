import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handelSubmit = async (e) => {
   
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
       
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
      
    });
    const json = await response.json();
    
    if (!json.success) {
      alert("enter valid credentials");
    }
    else{
      navigate('/login');
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
    
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Geo Location</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
          <Link to="/login" className="btn btn-danger m-3 ">Already a User</Link>
        </form>
      </div>
    </>
  );
}
