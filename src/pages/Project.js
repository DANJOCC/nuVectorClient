/*
page to see projects info if you are admin or contractor, and edit (only admin)
*/

import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchs } from '../helpers'
export default function Project() {

  const {token}=useSelector(state=>state.auth)

  const [project,setProject]=useState(null)

  const [client,setClient]=useState('')
  
  const {id}=useParams()
  const  fetching= async(id)=>{
    try {

         const data =await fetchs.getProject(id,token)
          console.log(data.client)
         setProject(data.project)
         setClient(data.client.name)
    
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetching(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='center-div'>
      <div className='center-card'>
        {project!==null && typeof project!=='undefined' &&
        <div className='grid grid-cols-8 grid-rows-9 gap-2 w-[90%]'>
          <h1 className='col-start-1 col-end-5 row-start-1 row-end-1'>{project.name}</h1>
          <p className='col-start-1 col-end-5 row-start-2 row-end-3'>{client}</p>
          <p className='col-start-1 col-end-5 row-start-3 row-end-4'>{project.description}</p>
        </div>}
      </div>
    </div>
  )
}
