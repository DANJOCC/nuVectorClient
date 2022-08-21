/*
page to see projects if you are admin or contractor
*/


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { fetchs } from '../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Workspace({role, token, id}) {

  const navigate=useNavigate()

  const [loading, setLoading]=useState(false)

  const [projects,setProjects]=useState(null)
  
  const redirecTo=()=>{
    role==='ADMIN' ? navigate('/NewProject', {replace:true}) : navigate('/NewTask',{replace:true})
  }

  const fetching=async (data)=>{
    setLoading(true)
    try {

    
       const {projects} = await fetchs.getProjects(data,token)
        
       
       
        setProjects(projects)  
    
    
      
    } catch (error) {
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }

  
  useEffect(()=>{
    fetching(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])



  return (
    <div className='center-div'>
        <div className='center-list-div'>
            <ul className='list'>
                   <li className='list-item'>
                      <button className='regular-buttom' onClick={redirecTo}>
                        <FontAwesomeIcon icon={solid('circle-plus')} size='lg'/>
                        {role === 'ADMIN' ? 'New Project' : 'New Task'}
                      </button>
                   </li>
            </ul>
        </div>
       
        <div className='center-content-cards'>
           {(projects!==null && typeof projects!=='undefined')  &&
           <ul className='list-cards'>
              {projects.map(value=>{
                return<Card key={value._id} id={value._id} title={value.name} intro={value.description} role={role}></Card>
              })}
              
           </ul>}
           {!loading && (projects===null || typeof projects==='undefined') && <h6 className='title-normal'>There is not projects yet</h6>}
           {loading && <h6 className='title-normal'>{role === 'ADMIN' ? 'Search for projects...': 'Search for active projects'}</h6>}
        </div>
    </div>
  )
}
