import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { fetchs } from '../helpers'

export default function Workspace({role, token, id}) {
  const navigate=useNavigate()
  const [projects,setProjects]=useState(null)
  const redirecTo=()=>{
    role==='ADMIN' ? navigate('/NewProject', {replace:true}) : navigate('/NewTask',{replace:true})
  }

  const fetching=(data)=>{
    try {

    
        fetchs.getProjects(data,token)
        .then(data=>{
       
        setProjects(data.projects)  
      })
    
      
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
        <div className='center-list-div'>
               <ul className='list'>
        <li className='list-item'>
                <button className='regular-buttom' onClick={redirecTo}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                {role === 'ADMIN' ? 'New Project' : 'New Task'}
                </button>
            </li>
        </ul>
        </div>
       
        <div className='center-content-cards'>
           {(projects!==null && typeof projects!=='undefined')  &&
           <ul className='list-cards'>
              {projects.map(value=>{
                return<Card key={value._id} title={value.name} intro={value.description}></Card>
              })}
              
           </ul>}
           {(projects===null || typeof projects==='undefined') && <h6 className='title-normal'>There is not projects yet</h6>}
        </div>
    </div>
  )
}
