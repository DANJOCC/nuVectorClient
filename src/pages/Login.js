import React, { useRef, useState } from 'react'
import jwt_decode from "jwt-decode";
import validator from 'validator'
import { useDispatch } from 'react-redux';
import { entry } from '../features/authSlice';
import { fetchs, setItem } from '../helpers';
import {useNavigate } from 'react-router-dom';
export default function Login() {
  
  const [loading, setLoading]=useState(false)
  
  const [emailError, setEmailError]=useState(false)//bad email format

  const [passwordError, setPasswordError]=useState(false)//bad password format

  const [wrongPassword, setWrongPassword]=useState(false)

  const navegate=useNavigate()

  const dispatch=useDispatch();
  const [user,setUser]=useState({
    email:'',
    password:''
  })

  
  const form=useRef(null)
  const password=useRef(null)

  //validatePassword is for validation wiht validator library and throw indicator for that

  const validatePassword=()=>{
    return password.current.value==='' ? false : !validator.isStrongPassword(password.current.value,{
                                                                  minLength:8,
                                                                  minNumbers:1,
                                                                  minSymbols:1,
                                                                  minUppercase:1
                                                                  })
  }

  const fetching= async (userData)=>{
    setLoading(true)
    let flag=false
    try {
      const data = await fetchs.login(userData)
    
    if(typeof data.msg!=='undefined'){//if props msg exist something bad happens when try to login
          setWrongPassword(true)
          flag=true
    }

    else{
       const payload=jwt_decode(data.token)
      
      payload.data.token=data.token
      dispatch(entry(payload.data))
      setItem('user',JSON.stringify(payload.data))}

    

    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
      if(!flag){navegate('/workspace',{replace:true})}
    }
  }

  const handleSubmit=async (e)=>{
      e.preventDefault()
      const userData=new FormData(form.current)
      if(!validator.isEmail(userData.get('email'))){
          setEmailError(true)
          return
      }

      if(passwordError){
        return
    }
    setEmailError(false)
      setUser({email:userData.get('email'), password:userData.get('password')})
      fetching(userData)
          
  }
  

  


  return (
    <div className='center-div'>
      <div className='center-card'>
      <h1 className='title-normal'>Work Login</h1>
      {loading && <h1 className='text-error-message'>Loading...</h1>}
      <form ref={form} onSubmit={handleSubmit} className='form-normal'>
        <input
         className={!emailError ? 'input-normal': 'input-bad'}
          type='text'
          name='email' 
          placeholder='Email' 
          defaultValue={user.email}
          required
          />

        {
          emailError && <p className='text-error-message'>invalid Email, please change it</p>
        }
        <input ref={password}
        className={!passwordError ? 'input-normal': 'input-bad'}
        type='password' 
        placeholder='Password' 
        name='password'
        onChange={e=>{setPasswordError(validatePassword)
                      setWrongPassword(false)
                      }}
        required
        defaultValue={user.password}
        />

        {
          passwordError && 
          <p className='text-error-message'>
            invalid password, all password should have a number,
             a capital letter, 
             a special character and a minimun length of 8</p>
        }
        {
          wrongPassword && 
          <p className='text-error-message'>
            wrong password
            </p>
        }

        <input className='normal-buttom' type="submit" value={loading ? "Waiting...":"Log in"}/>
      </form>
      </div>
    </div>
  )
}
