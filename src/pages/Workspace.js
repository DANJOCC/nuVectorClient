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

  const [page, setPage]=useState(0)

  const [loading, setLoading]=useState(false)

  const [projects,setProjects]=useState(null)
  
  const redirecTo=(flag)=>{
    if(flag){
      navigate('/tasks',{replace:true})
      return
    }
    role==='ADMIN' ? navigate('/NewProject', {replace:true}) : navigate('/tasks',{replace:true})
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
                      <button className='regular-buttom' onClick={()=>redirecTo(false)}>
                        <FontAwesomeIcon icon={solid('circle-plus')} size='lg'/>
                        {role === 'ADMIN' ? 'New Project' : 'tasks'}
                      </button>
                   </li>
                   <li className='list-item'>
                      <button className='regular-buttom' onClick={()=>redirecTo(true)}>
                        <FontAwesomeIcon icon={solid('list-check')} size='lg'/>
                        Tasks
                      </button>
                   </li>
            </ul>
        </div>
       
        <div className='center-content-cards'>
           {(projects!==null && typeof projects!=='undefined')  &&
           <ul className='list-cards'>
              {
              projects.slice(12*page,12*(1+page)).map(value=>{
                return<Card key={value._id} id={value._id} title={value.name} intro={value.description} role={role}></Card>
              })}
              
           </ul>}
           {!loading && (projects===null || typeof projects==='undefined') && <h6 className='title-normal'>There is not projects yet</h6>}
           {loading && <h6 className='title-normal'>{role === 'ADMIN' ? 'Search for projects...': 'Search for active projects'}</h6>}
        </div>
        {(projects!==null && typeof projects!=='undefined') && <div className='flex flex-row gap-x-5 m-2'>
        <button className='normal-buttom' onClick={()=>{setPage((prev)=>{
          if(page>0){
            return page-1
          }
          if(page===0){
            return 0
          }
        })}}>
          <FontAwesomeIcon icon={solid('arrow-left-long')} size='lg'/>
          </button>
        <div className='text-black text-xl font-bold flex text-center place-content-center items-center'>{page}</div>
        <button className='normal-buttom' onClick={()=>{setPage((prev)=>{
          if(projects.length<12){
            return prev
          }
          if(prev===0 ){return prev+1}
          if(projects.length>(prev+1)*12){
            return prev+1
          }
          if(projects.length===(prev+1)*12){
            return 0
          }
          if(projects.length<(prev+1)*12){
            return prev
          }
        })}}>
          <FontAwesomeIcon icon={solid('arrow-right-long')} size='lg'/>
          </button>
        </div>}
    </div>
  )
}
