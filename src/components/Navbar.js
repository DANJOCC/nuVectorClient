import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/LogoNuVector.png'
export default function Navbar() {
  return (
    
    <nav className='bg-gray flex flex-row justify-between'>

        <Link className='' to='/'><img width='200px' height='100px' src={logo} alt='logo'></img></Link>
       

        <ul className='list'>
            <li className='list-item'>
                <button><Link className='nav-list-buttom' to='/login'>Login</Link></button>  
            </li>
            <li className='list-item'>
                <button className='nav-list-buttom' ><a href='/sign Up'>Sign in</a></button>
            </li>
        </ul>

    </nav>
  )
}
