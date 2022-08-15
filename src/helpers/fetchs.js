const URL=process.env.REACT_APP_API_URL
const fetchs={
    login: async (body)=>{
       const res = await fetch(URL+'/login',{
            method:'POST',
            body
        })
        console.log(res)
       const data=await res.json();
       console.log(data)
        return data
}
}
export default fetchs