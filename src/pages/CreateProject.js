/*
page to create projects if you are admin
*/

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchs, getItem } from '../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
export default function CreateProject({token}) {

  const navigate=useNavigate()

  const [loading, setLoading]=useState(false)

  const [clients,setClients]=useState(null) //clients active to do projects

  const form=useRef(null)

  useEffect(()=>{
    fetching(null,true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

 



  const redirecTo=()=>{
    navigate('/workspace',{replace:true})
  }

  const fetching=async(formData,flag)=>{
    setLoading(true)
    try {

      if(flag){
        const data= await fetchs.getClients(token)
        
        setClients(data.names)
      }
      else{
       await  fetchs.newProject(formData,token)
    }
      
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
      fetching(formData,false)
  }


  return (
    <div className='center-div'>
      <div className='center-list-div'>
               <ul className='list'>
                  <li className='list-item'>
                    <button className='regular-buttom' onClick={()=>{redirecTo()}}>
                    <FontAwesomeIcon icon={solid('circle-arrow-left')} size='lg'/>
                      Back
                    </button>
                  </li>
        </ul>
      </div>
      <div className='center-card'>
        <h6 className='title-normal'>New Project</h6>
        {loading && <h1 className='text-error-message'>Loading...</h1>}
       {!loading && <form ref={form} onSubmit={e=>handleSubmit(e)} className='grid grid-cols-8 grid-rows-9 gap-2 w-[90%]'>
          <label className='col-start-1 col-end-5 row-start-1 row-end-1'>Project's name:</label>
          <input className='input-normal-v2 col-start-1 col-end-5 row-start-2 row-end-2' required type='text' name='name' id='name'/>

          <label className='col-start-1 col-end-5 row-start-3 row-end-3'>Client:</label>
          <select className='input-normal-v2 col-start-1 col-end-5 row-start-4 row-end-4' required name='client_id' id='client'>
                {clients!==null && clients.map((value=>{
                  return <option key={value.id} value={value.id}>{value.name}</option>
                }))}
          </select>

          <label  className='col-start-5 col-end-7 row-start-3 row-end-3'>Start Date:</label>
          <input type='date'className='input-normal-v2 text-center col-start-5 col-end-7 row-start-4 row-end-4' required  name='start' id='start' min='2022-01-01' max='2040-12-31'></input>
          
          <label  className='col-start-7 col-end-9 row-start-3 row-end-3'>End Date:</label>
          <input type='date'className='input-normal-v2 tex-center col-start-7 col-end-9 row-start-4 row-end-4' required name='end' id='end' min='2022-01-01' max='2040-12-31'></input>
          
          <label className='col-start-1 col-end-9 row-start-5 row-end-5'>Project's description:</label>
          <textarea className='input-normal-v3 col-start-1 col-end-9 row-start-6 row-end-8' maxLength={200} name='description' id='description'/>

          <input type='submit' className='normal-buttom col-start-4 col-end-6 row-start-9 row-end-9 m-2' value='Create'/>
        </form>}
      </div>
    </div>
  )
}
