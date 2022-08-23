import React from 'react'

export default function Tables({title,headers,rows,type}) {
  return (
    <table className={type==='TASK' ?'bg-white-solid border-2 border-orange w-[90%] self-start  overflow-auto':'bg-white-solid border-2 border-orange w-[50%] self-start table-auto overflow-auto'}>
    <thead>
      <tr>
        <th align='center' colSpan={type==='FORM'?'4':'10'}>{title}</th>
      </tr>
    <tr>
        {headers.map((value,index)=>{
           return <th key={index} className='border-2 border-orange'>{value}</th>
        })}

    </tr>
    </thead>
    <tbody>
    {rows!==null && typeof rows!=='undefined' && type==='FORM' &&
    rows.map((value,index)=>{
      return <tr key={index}>
        <td className='border-2 border-orange text-center'>{index}</td>
        <td className='border-2 border-orange text-center'>{value.name}</td>
        <td className='border-2 border-orange text-center'>{value.description}</td>
        <td className='border-2 border-orange text-center'>{value.active ? 'active': 'inactive'}</td>
      </tr>
    })}
    {rows!==null && typeof rows!=='undefined' && type==='TASK' &&
    rows.map((value,index)=>{
      return <tr key={index}>
        <td className='border-2 border-orange text-center'>{index}</td>
        <td className='border-2 border-orange text-center'>{value.description}</td>
        <td className='border-2 border-orange text-center'>{new Date(value.date).toISOString().split('T')[0]}</td>
        <td className='border-2 border-orange text-center'>{value.duration}</td>
        <td className='border-2 border-orange text-center'>{value.billable ?'Yes':'No'}</td>
        <td className='border-2 border-orange text-center'>{value.contractor_name}</td>
        <td className='border-2 border-orange text-center'>{value.project_name}</td>
        <td className='border-2 border-orange text-center'>{value.client_name}</td>
        <td className='border-2 border-orange text-center'>{value.product_name}</td>
        <td className='border-2 border-orange text-center'>{value.activity_name}</td>
        <td className='border-2 border-orange text-center'>{value.category_name}</td>

      </tr>
    })}
    </tbody>
  </table>
  )
}
