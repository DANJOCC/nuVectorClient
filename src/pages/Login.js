import React, { useRef, useState } from 'react'
import validator from 'validator'
import fetchs from '../helpers/fetchs'
export default function Login() {
  const [loading, setLoading]=useState(false)

  const [user,setUser]=useState({
    email:'',
    password:''
  })

  
  const form=useRef(null)
  const password=useRef(null)

  const [emailError, setEmailError]=useState(false)
  const [passwordError, setPasswordError]=useState(false)

  const validatePassword=()=>{
    return password.current.value==='' ? false : !validator.isStrongPassword(password.current.value,{
                                                                  minLength:8,
                                                                  minNumbers:1,
                                                                  minSymbols:1,
                                                                  minUppercase:1
                                                                  })
  }

  const fetching=(data)=>{
    setLoading(true)
    try {
      const res = fetchs.login(data)
      console.log(res)

    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }

  const handleSubmit=(e)=>{
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
      console.log(userData.get('email'))
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
        onChange={e=>{setPasswordError(validatePassword)}}
        required
        defaultValue={user.password}
        />

        {
          passwordError && <p className='text-error-message'>invalid password, all password should have a number,
             a capital letter, 
             a special character and a minimun length of 8</p>
        }

        <input className='buttom-normal' type="submit" value="Log in"/>
      </form>
      </div>
    </div>
  )
}
