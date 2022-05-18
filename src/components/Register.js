import React from 'react';

export default function Register({ switchToSignin }) {
    return (
        <>
            <div className='row signup inputGroup inputGroup1'>
                <div className="inputGroup inputGroup1 mb-0 col-6">
                    <input type="text" id="first_name" name='first_name' className="username" maxLength="256" autoComplete="off"/>
                    <p className="helper helper1">First Name</p>
                    <span className="indicator"></span>
                </div>
                <div className="inputGroup inputGroup1 mb-0 col-6">
                    <input type="text" id="last_name" name='last_name' className="username" maxLength="256" autoComplete="off"/>
                    <p className="helper helper1">Last Name</p>
                    <span className="indicator"></span>
                </div>
            </div>
            
            <div className="signup inputGroup inputGroup1">
                <input type="text" id="email" name='email' className="email" maxLength="256" autoComplete="off"/>
                <p className="helper helper1">Email</p>
                <span className="indicator"></span>
            </div>
            <div className="signup inputGroup inputGroup2">
                <input type="password" name='password1' id="password" className="password" />
                <p className="helper helper1">Password</p>
            </div>
            <div className="signup inputGroup inputGroup2">
                <input type="password" name='password2' id="password2" className="password" />
                <p className="helper helper1">Confirm Password</p>
            </div>
            <div className="signup inputGroup inputGroup3">
                <button type='submit' id="login">Log in</button>
            </div>
            <div id="page-switch"  onClick={()=>{switchToSignin()}}><p>Already have an account? <span>Sign In</span></p></div>
        </>
    )
}
