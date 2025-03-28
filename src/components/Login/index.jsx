import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isError: false,
    };
  }

  changeMailId = (event) => {
    this.setState({ email: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { setToken } = this.props;
    const userDetails = { email, password };
    const url = "https://reqres.in/api/login";
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (response.ok) {
        Cookies.set("token", data.token, { expires: 30 });
        setToken(data.token);
        window.location.href = "/users?page=1";
      } else {
        this.setState({ isError: true });
      }
    } catch (error) {
      console.error("Error during login:", error);
      this.setState({ isError: true });
    }
  };


  render(){
  	const {email, password, iserror} = this.state
    return(
    	<div className="login-container">
      	<div className="login-card">
        	<h1 className="login-head">Login</h1>
          <form className="form" onSubmit={this.submitForm}>
          	<label htmlFor="mailid" className="label">Email ID</label>
            <input id="mailid" className="inputtext" placeholder="Enter Your Email Id" type="text" value={email} onChange={this.changeMailId} required/>
            <label htmlFor="pwd" className="label">Password</label>
            <input id="pwd" className="inputtext" placeholder="Enter Your Password" type="password" value={password} onChange={this.changePassword} required/>
            <button className="login-button" type="submit">Submit</button>
            {iserror && <p className="errorMsg">*Invalid Credentials</p>}
          </form>
        </div>
	    </div>
  	)
  }
}

export default Login
