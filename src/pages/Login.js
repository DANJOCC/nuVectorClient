import React from 'react'

export default function Login() {
  return (
    <div className='center-div'>
      <div className='center-card'>
      <h1 className='title-normal'>Work Login</h1>
      <form className='form-normal'>
        <input className='input-normal' type='text' placeholder='Email' required></input>
        <input className='input-normal' type='password' placeholder='Password' required></input>
        <input className='buttom-normal' type="submit" value="Log in"></input>
      </form>
      </div>
    </div>
  )
}
