import { useEffect,useState } from "react"

const Clock = () => {

    const[Time,setTime] = useState()

    useEffect(()=>{
        setInterval(()=>{
            const date = new Date();
            setTime(date.toLocaleTimeString());
        },1000);
    },[]);
    
    return (
        <div style={{fontSize:40, marginLeft: 10, fontWeight: 700}}>{Time}</div>
    )
}

export default Clock
