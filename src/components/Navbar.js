import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/LogoNuVector.png'
import { logged } from '../features/authSlice';
import { erase } from '../helpers/sessionStorage';
export default function Navbar() {
  const userData=useSelector(state=>state.auth); 
  const dispatch=useDispatch(); 
  const navigate=useNavigate()
  const logOut=()=>{
    erase()
    dispatch(logged())
    navigate('/', {replace:true})
  }

  return (
    
    <nav className='nav-header'>

        <Link className='min-w-max' to='/'><img width='200px' height='100px' src={logo} alt='logo'></img></Link>
       

       {!userData.user.logged && 
       <ul className='nav-list'>
            <li className='nav-list-item'>
                <button><Link className='nav-list-buttom' to='/login'>Login</Link></button>  
            </li>
            <li className='nav-list-item'>
                <button className='nav-list-buttom' ><a href='/sign Up'>Sign up</a></button>
            </li>
        </ul>}

        {
          userData.user.logged &&
          <ul className='nav-list'>
            <li className='nav-list-item'>
                <button><Link className='nav-list-buttom' to='/'>{userData.user.username}</Link></button>
            </li>
            <li className='nav-list-item'>
                <button ><Link className='nav-list-buttom' to='/workspace'>Workspace</Link></button>
            </li>
            <li className='nav-list-item'>
                <button className='nav-list-buttom' onClick={logOut}>Log out</button>  
            </li>
        </ul>}

    </nav>
  )
}
