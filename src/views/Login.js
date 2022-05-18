import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Login({ setUser }) {
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState('');
    
    const sendToFlask = async ( e ) => {
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:5000/auth/api/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            // log them in 
            setUser({...data.user, token:data.token})
            setRedirect(true)
        }
        else {
            setMessage(data.message)
        }
    };
    
        return redirect?
        (<Navigate to='/' />)
        :
        (
            <div className='border col-12 col-xs-9 col-sm-8 col-lg-4'>
                <h6>{message}</h6>
                <form onSubmit={(e)=>sendToFlask(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input name='email' type="text" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>     
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input name='password' type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    