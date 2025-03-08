import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
 
    const handleLogout =()=>{
        localStorage.removeItem("user")
        navigate('/',  { replace: true })
    }
   
    return (
        user && (
            <div>
                <p>this is the my {user.data.first_name}</p>
                <button onClick={handleLogout}>logout</button>
            </div>
        )
    )
}

export default Home