import React from 'react'

export default function Tables({title,headers,rows,}) {
  return (
    <table className='bg-white-solid border-2 border-orange w-[50%] self-start table-auto overflow-auto'>
    <thead>
      <tr>
        <th align='center' colSpan='4'>{title}</th>
      </tr>
    <tr>
        {headers.map((value,index)=>{
           return <th key={index} className='border-2 border-orange'>{value}</th>
        })}

    </tr>
    </thead>
    <tbody>
    {rows!==null && typeof rows!=='undefined' &&
    rows.map((value,index)=>{
      return <tr key={index}>
        <td className='border-2 border-orange text-center'>{index}</td>
        <td className='border-2 border-orange'>{value.name}</td>
        <td className='border-2 border-orange'>{value.description}</td>
        <td className='border-2 border-orange'>{value.active ? 'active': 'inactive'}</td>
      </tr>
    })}
    </tbody>
  </table>
  )
}
