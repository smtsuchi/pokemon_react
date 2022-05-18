import React, { useState, useEffect } from 'react';
import Home from './views/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './views/Login';
import Register from './views/Register';
import Auth from './views/Auth';
import Poke from './views/Poke';
import SinglePoke from './views/SinglePoke';


export default function App() {
  const [user, setUser] = useState({})
  useEffect(()=>{
    const user = localStorage.getItem('my_user');
    if (user) {setUser(JSON.parse(user))}
  },[])
  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <img className='bg-image' src='https://upload.wikimedia.org/wikipedia/commons/3/39/Pokeball.PNG' alt='pokeball'/>
      <div className='main'>
        
        <Routes>
          <Route path='/' element={<Home user={user}/> } />
          <Route path='/auth' element={<Auth setUser={setUser} /> } />
          <Route path='/pokemon/:pageNumber' element={<Poke />}  />
          <Route path='/pokemon/search/:name' element={<SinglePoke user={user}/>}  />
          {/* <Route path='/news' element={<News />} />
          <Route path='/blog/:id' element={<IndividualPost token={this.state.token} /> }/>
          <Route path='/blog/create' element={<CreatePost token={this.state.token} />} />
          <Route path='/blog/update/:id' element={<UpdatePost token={this.state.token} /> }/> */}
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </div>
    </>
  )
}
