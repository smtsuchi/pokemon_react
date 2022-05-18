import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function SignUp() {
const [redirect, setRedirect] = useState(false);
const [message, setMessage] = useState('');

const sendToFlask = async ( e ) => {
    e.preventDefault();
    const password1 = e.target.password1.value
    const password2 = e.target.password2.value
    if (password1!==password2) {setMessage("Passwords don't match!")}
    else{
        const res = await fetch("http://127.0.0.1:5000/auth/api/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                password: e.target.password1.value,
                icon: 1
            })
        });
        const data = await res.json();
        if (data.status === 'ok') {
            setRedirect(true)
        }
        else {
            setMessage(data.message)
        }
    }
};

    return redirect?
    (<Navigate to='/login' />)
    :
    (
        <div className='border col-12 col-xs-9 col-sm-8 col-lg-4'>
            <h6>{message}</h6>
            <form onSubmit={(e)=>sendToFlask(e)}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input name='first_name' type="text" className="form-control" id="first_name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input name='last_name' type="text" className="form-control" id="last_name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name='email' type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input name='password1' type="password" className="form-control" id="password1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input name='password2' type="password" className="form-control" id="password2" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
