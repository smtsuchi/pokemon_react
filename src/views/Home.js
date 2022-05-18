import React, { useState } from 'react'
import Battle from '../components/Battle';
import HomeNav from '../components/HomeNav'
import Teams from '../components/Teams'


export default function Home({ user }) {
  const [active, setActive] = useState('teams');

  return (
    <div className='row'>
      <HomeNav setActive={setActive}/>
      {user.id?active === 'teams' ? <Teams user={user} /> : <Battle />:<h2>Please log in to cotinue  </h2>}
      
    </div>
  )
}
