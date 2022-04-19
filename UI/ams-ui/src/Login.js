import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { Navigate } from 'react-router';



export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);


  const handleSubmit = async e => {
    setSuccess(true);
    fetch('http://localhost:3000/api/login', {
				method: 'POST',
				//   mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"password": password, "email_id": username})
			}).then(response => response.json())
				.then(resData => {
					localStorage.setItem("userId", resData.user.user_id)
					localStorage.setItem("isStudent", resData.user.student)
				}).catch(error => console.log(error))

  }

  return (
    <>

        <div className="login-wrapper">
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="labels">
              <label>
                <p>Username</p>
                <input className="input" type="text" onChange={e => setUserName(e.target.value)} />
              </label>
              <label>
                <p>Password</p>
                <input className="input" type="password" onChange={e => setPassword(e.target.value)} />
              </label>
            </div>
            <div className="submitButton">
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
        </div>

        {
				success && localStorage.getItem("isStudent") ?        <Navigate to='/board' />
				:         <Navigate to='/assignmentUpload' />

			}
    </>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
};