import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { RiSwordLine } from 'react-icons/ri'

export default function HomeNav({ setActive }) {
  return (
    <div className='home-nav'>
        <AiOutlineTeam onClick={()=>{setActive('teams')}}/>
        <RiSwordLine onClick={()=>{setActive('battle')}}/>
    </div>
  )
}
