const setItem=(key,value)=>{
    sessionStorage.setItem(key,value)
}

const getItem=(key)=>{
    const data=sessionStorage.getItem(key)
    return data
}

module.exports={
    getItem,
    setItem
}