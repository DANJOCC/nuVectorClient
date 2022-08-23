import React, { useEffect, useRef, useState } from 'react'
import { fetchs, getItem } from '../helpers'

export default function FormProject({token,empty,edit,data}) {

  const [loading, setLoading]=useState(false)

  const [clients,setClients]=useState(null) //clients active to do projects

  const [active, setActive]=useState(()=>{
    if(typeof data ==='undefined'){return false}
    else return data.active
  })
    const [blank]=useState(()=>{
        if(typeof empty==='undefined'){return true}
        if(typeof empty==='boolean'){return empty}
        else return true
    })

    const [editable]=useState(()=>{
        if(typeof edit==='undefined'){
            return false
        }
        if(typeof edit==='boolean'){
            return edit
        }
        else return false
    })

  const form=useRef(null)

  useEffect(()=>{
    fetching('null',true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


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

const handleEdit=async (e)=>{
    e.preventDefault()

    const formData=new FormData(form.current);

    formData.append('id',data.id)
    formData.append('active',active)

    try {

        const data=await fetchs.updateProject(formData,token)
        
        console.log(data)
      } catch (error) {
        console.error(error)
      }
      finally{
        setLoading(false)
      }
  
}

  return (
    <>
       {blank &&<form ref={form} onSubmit={e=>handleSubmit(e)} className='grid grid-cols-8 grid-rows-9 gap-2 w-[90%]'>
          <label className='col-start-1 col-end-5 row-start-1 row-end-1'>Project's name:</label>
          <input className='input-normal-v2 col-start-1 col-end-5 row-start-2 row-end-2' required type='text' name='name' id='name'/>

          <label className='col-start-1 col-end-5 row-start-3 row-end-3'>Client:</label>
          <select className='input-normal-v2 col-start-1 col-end-5 row-start-4 row-end-4' required name='client_id' id='client'>
                {!loading &&  clients!==null && clients.map((value=>{
                  return <option key={value.id} value={value.id}>{value.name}</option>
                }))}
          </select>

          <label  className='col-start-5 col-end-7 row-start-3 row-end-3'>Start Date:</label>
          <input type='date'className='input-normal-v2 text-center col-start-5 col-end-7 row-start-4 row-end-4' required  name='start' id='start' min='2022-01-01' max='2040-12-31'></input>
          
          <label  className='col-start-7 col-end-9 row-start-3 row-end-3'>End Date:</label>
          <input type='date'className='input-normal-v2 tex-center col-start-7 col-end-9 row-start-4 row-end-4' required name='end' id='end' min='2022-01-01' max='2040-12-31'></input>
          
          <label className='col-start-1 col-end-9 row-start-5 row-end-5'>Project's description:</label>
          <textarea className='input-normal-v3 col-start-1 col-end-9 row-start-6 row-end-8' maxLength={200} name='description' id='description'/>

          <input type='submit' className='normal-buttom col-start-4 col-end-6 row-start-9 row-end-9 m-2' value={loading ? 'Loading...':'Create'}/>
        </form>}

        {!blank && !editable &&<form ref={form} className='grid grid-cols-8 grid-rows-9 gap-2 w-[90%]'>
          <label className='col-start-1 col-end-5 row-start-1 row-end-1'>Project's name:</label>
         <input className='input-normal-v4 col-start-1 col-end-5 row-start-2 row-end-2' value={data.name} required type='text' name='name' id='name' readOnly/>
          
           <button className={active ? 'buttom-active col-start-5 col-end-5 row-start-2 row-end-2': 'buttom-inactive col-start-5 col-end-5 row-start-2 row-end-2'}
             disabled>{active? 'Active':'Inactive'}</button>         
          
          <label className='col-start-1 col-end-5 row-start-3 row-end-3'>Client:</label>
          <input className='input-normal-v4 col-start-1 col-end-5 row-start-4 row-end-4'  type='text' value={data.client} required name='client_id' id='client' readOnly></input>

          <label  className='col-start-5 col-end-7 row-start-3 row-end-3'>Start Date:</label>
          <input type='date'className='input-normal-v4 text-center col-start-5 col-end-7 row-start-4 row-end-4' value={data.start} required  name='start' id='start' min='2022-01-01' max='2040-12-31' readOnly></input>
          
          <label  className='col-start-7 col-end-9 row-start-3 row-end-3'>End Date:</label>
          <input type='date'className='input-normal-v4 text-center col-start-7 col-end-9 row-start-4 row-end-4' value={data.end} required name='end' id='end' min='2022-01-01' max='2040-12-31' readOnly></input>
          
          <label className='col-start-1 col-end-9 row-start-5 row-end-5'>Project's description:</label>
          <textarea className='input-normal-v4 col-start-1 col-end-9 row-start-6 row-end-8' value={data.description} maxLength={200} name='description' id='description' readOnly/>
        </form>}

        {!blank && editable &&<form ref={form} onSubmit={e=>handleEdit(e)} className='grid grid-cols-8 grid-rows-9 gap-2 w-[90%]'>
          <label className='col-start-1 col-end-5 row-start-1 row-end-1'>Project's name:</label>
          <input className='input-normal-v2 col-start-1 col-end-5 row-start-2 row-end-2' defaultValue={data.name} required type='text' name='name' id='name' />

           <button className={active ? 'buttom-active col-start-5 col-end-5 row-start-2 row-end-2': 'buttom-inactive col-start-5 col-end-5 row-start-2 row-end-2'}
             onClick={()=>{setActive(!active)}}  >{active ? 'Active':'Inactive'}</button>    

          <label className='col-start-1 col-end-5 row-start-3 row-end-3'>Client:</label>
          <select className='input-normal-v2 col-start-1 col-end-5 row-start-4 row-end-4' defaultValue={data.client} required name='client_id' id='client'>
                {!loading && clients!==null && clients.map((value=>{
                  return <option key={value.id} value={value.id}>{value.name}</option>
                }))}
          </select>

          <label  className='col-start-5 col-end-7 row-start-3 row-end-3'>Start Date:</label>
          <input type='date'className='input-normal-v2 text-center col-start-5 col-end-7 row-start-4 row-end-4' defaultValue={data.start.split(',')[0]} required  name='start' id='start' min='2022-01-01' max='2040-12-31' ></input>
          
          <label  className='col-start-7 col-end-9 row-start-3 row-end-3'>End Date:</label>
          <input type='date'className='input-normal-v2 tex-center col-start-7 col-end-9 row-start-4 row-end-4' defaultValue={data.end.split(',')[0]}required name='end' id='end' min='2022-01-01' max='2040-12-31'></input>
          
          <label className='col-start-1 col-end-9 row-start-5 row-end-5'>Project's description:</label>
          <textarea className='input-normal-v3 col-start-1 col-end-9 row-start-6 row-end-8' defaultValue={data.description} maxLength={200} name='description' id='description'/>
          <input type='submit' className='normal-buttom col-start-4 col-end-6 row-start-9 row-end-9 m-2' value={loading ? 'Loading...':'Edit'}/>
        </form>}
    </>
  )
}
