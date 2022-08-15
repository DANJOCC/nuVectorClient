import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../assets/images/LogoNuVector.png'
import { getStorageData } from '../features/authSlice';
export default function Navbar() {
  const userData=useSelector(state=>state.auth);
  const dispatch=useDispatch()  
useEffect(()=>{
  dispatch(getStorageData())
})
  return (
    
    <nav className='bg-gray flex flex-row justify-between'>

        <Link className='' to='/'><img width='200px' height='100px' src={logo} alt='logo'></img></Link>
       

       {!userData.user.logged && 
       <ul className='list'>
            <li className='list-item'>
                <button><Link className='nav-list-buttom' to='/login'>Login</Link></button>  
            </li>
            <li className='list-item'>
                <button className='nav-list-buttom' ><a href='/sign Up'>Sign in</a></button>
            </li>
        </ul>}

        {
          userData.user.logged &&
          <ul className='list'>
            <li className='list-item'>
                <button><Link className='nav-list-buttom' to='/'>{userData.user.username}</Link></button>
            </li>
            <li className='list-item'>
                <button className='nav-list-buttom' ><a href='/'>Workspace</a></button>
            </li>
            <li className='list-item'>
                <button><Link className='nav-list-buttom' to='/'>Log Out</Link></button>  
            </li>
        </ul>}

    </nav>
  )
}
