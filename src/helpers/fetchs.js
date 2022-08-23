const URL=process.env.REACT_APP_API_URL
export const fetchs={

   //login fetch

   //data=token

    login: async (body)=>{
       const res = await fetch(URL+'/login',{
            method:'POST',
            body
        })
       const data=await res.json();
       if(typeof data.msg!=='undefined'){
         return {...data, bad:true}
       }
    return data
    },


    //create new project
    //data={msg:'new project create'}

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

   //get new projects

   //data:Array<Projects>

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

   //get project info

   //data:Project

   getProject:async (id,token)=>{
      const res = await fetch(URL+'/getProject/'+id,{
           method:'GET',
           headers:{
              Authorization: 'Bearer '+token
           },
       })
      const data=await res.json();
   return data
   },

   //get clients active names

   /*data:Array<
   {
      name:string
      id:string
   }>

      
   */
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

   //get client info from projects id

   //data:Client
   getClient:async (id,token)=>{
      const res = await fetch(URL+'/getClient/'+id,{
           method:'GET',
           headers:{
              Authorization: 'Bearer '+token
           },
       })
      const data=await res.json();
   return data
   },

   updateProject:async (body,token)=>{
      const res = await fetch(URL+'/updateProject',{
           method:'PUT',
           headers:{
              Authorization: 'Bearer '+token
           },
           body
       })
      const data=await res.json();
   return data
   },

   getTasksFilters:async (name,filter,token)=>{
      const res = await fetch(URL+'/tasks/'+name+"/"+filter,{
           method:'GET',
           headers:{
              Authorization: 'Bearer '+token
           },
       })
      const data=await res.json();
   return data
   },

}