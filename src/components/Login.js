import React from 'react'

export default function Login({ switchToSignup }) {
    return (
        <>
            <div className="inputGroup inputGroup1">
                <input type="text" id="email" name='email' className="username" maxLength="256" autoComplete="off"/>
                <p className="helper helper1">Email</p>
                <span className="indicator"></span>
            </div>
            <div className="inputGroup inputGroup2">
                <input type="password" name='password' id="password" className="password" />
                <p className="helper helper1">Password</p>
            </div>
            <div className="inputGroup inputGroup3">
                <button type='submit' id="login">Log in</button>
            </div>
            <div id="page-switch" onClick={()=>{switchToSignup()}}><p>Don't have an account? <span>Sign Up</span></p></div>
            
        </>
    )
}
