import React, { useRef, useState } from 'react'
import { fetchs, getItem } from '../helpers'

export default function CreateProject({token}) {

  const [loading, setLoading]=useState(false)

  const form=useRef(null)


  const fetching=(data)=>{
    setLoading(true)
    try {
      console.log(token)
      const res = fetchs.newProject(data,token)
      res.then(data=>{
       
      const payload=data

      console.log(payload)  
    })
      
      

    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }
  const handleSubmit=(e)=>{
      e.preventDefault()

      const formData=new FormData(form.current);
      const user=JSON.parse(getItem('user'))
      formData.append('id',user.id)
      fetching(formData)
  }


  return (
    <div className='center-div'>
      <div className='center-card'>
        <h6 className='title-normal'>New Project</h6>
        {loading && <h1 className='text-error-message'>Loading...</h1>}
        <form ref={form} onSubmit={e=>handleSubmit(e)} className='grid grid-cols-8 grid-rows-9 gap-2 w-[90%]'>
          <label className='col-start-1 col-end-5 row-start-1 row-end-1'>Project's name:</label>
          <input className='input-normal-v2 col-start-1 col-end-5 row-start-2 row-end-2' required type='text' name='name' id='name'/>

          <label className='col-start-1 col-end-5 row-start-3 row-end-3'>Client:</label>
          <input className='input-normal-v2 col-start-1 col-end-5 row-start-4 row-end-4' required type='text' name='client' id='client'/>

          <label  className='col-start-5 col-end-7 row-start-3 row-end-3'>Start Date:</label>
          <input type='date'className='input-normal-v2 text-center col-start-5 col-end-7 row-start-4 row-end-4' required  name='start' id='start' min='2022-01-01' max='2040-12-31'></input>
          
          <label  className='col-start-7 col-end-9 row-start-3 row-end-3'>End Date:</label>
          <input type='date'className='input-normal-v2 tex-center col-start-7 col-end-9 row-start-4 row-end-4' required name='end' id='end' min='2022-01-01' max='2040-12-31'></input>
          
          <label className='col-start-1 col-end-9 row-start-5 row-end-5'>Project's description:</label>
          <textarea className='input-normal-v3 col-start-1 col-end-9 row-start-6 row-end-8' maxLength={200} name='description' id='description'/>

          <input type='submit' className='normal-buttom col-start-4 col-end-6 row-start-9 row-end-9 m-2' value='Create'/>
        </form>
      </div>
    </div>
  )
}
