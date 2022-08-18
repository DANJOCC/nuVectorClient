const URL=process.env.REACT_APP_API_URL
export const fetchs={
    login: async (body)=>{
       const res = await fetch(URL+'/login',{
            method:'POST',
            body
        })
       const data=await res.json();
    return data
    },
    newProject: async (body, token)=>{
        const res = await fetch(URL+'/newProject',{
             method:'POST',
             headers:{
                Authorization: 'Bearer '+token
             },
             body
         })
        const data=await res.json();
     return data
     },

   getProjects:async (id,token)=>{
      const res = await fetch(URL+'/getProjects/'+id,{
           method:'GET',
           headers:{
              Authorization: 'Bearer '+token
           },
       })
      const data=await res.json();
   return data
   },
   getClients:async (token)=>{
      const res = await fetch(URL+'/getClientsNames',{
           method:'GET',
           headers:{
              Authorization: 'Bearer '+token
           },
       })
      const data=await res.json();
   return data
   },
}