const setItem=(key,value)=>{
    sessionStorage.setItem(key,value)
}

const getItem=(key)=>{
    const data=sessionStorage.getItem(key)
    return data
}

const erase=()=>{
    sessionStorage.clear()
}

module.exports={
    getItem,
    setItem,
    erase
}