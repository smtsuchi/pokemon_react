import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Nav.css';
import { CgHomeAlt } from 'react-icons/cg';
import { CgLogIn } from 'react-icons/cg';
import { CgLogOut } from 'react-icons/cg';
import { CgPokemon } from 'react-icons/cg';

export default function Navbar({ user, setUser }) {
  const logout = () => {
    setUser({})
    localStorage.removeItem('my_user');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id='my-nav'>
        <div className="container-fluid">
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-evenly flex-grow-1">
              <li className="nav-item" id='home-btn'>
                <Link className="nav-link" aria-current="page" to="/"><CgHomeAlt/></Link>
              </li>
              <li className="nav-item" id='pokeball-btn'>
                <Link className="nav-link" to="/pokemon/1"><CgPokemon/></Link>
              </li>
              {user ?
                <div className='d-flex' id='auth-btn'>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth" onClick={() => {logout()}}><CgLogOut /></Link>
                  </li>
                  <li className="nav-item" id='nav-name'>
                    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
                    {user ? user.email : "Guest"}
                    </a>
                </li>
                </div>
                :
                <div className='d-flex' id='auth-btn'>
                <li className="nav-item">
                    <Link className="nav-link" to="/auth">< CgLogIn /></Link>
                </li>
                <li className="nav-item" id='nav-name'>
                    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
                    {user ? user.email : "Guest"}
                    </a>
                </li>
                </div>

              }
              
            </ul>
          </div>
        </div>
      </nav>
  )
}
