const URL=process.env.REACT_APP_API_URL
export const fetchs={
    login: async (body)=>{
       const res = await fetch(URL+'/login',{
            method:'POST',
            body
        })
       const data=await res.json();
    return data
}
}