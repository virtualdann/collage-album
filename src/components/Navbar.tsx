import LogoutButton from "./LogoutButton"

import { useEffect, useState } from 'react'

const Navbar = () => {

    const [token, setToken] = useState("")
    
    useEffect(() => {
      setToken(window.localStorage.getItem("token") || "")
    
    }, [])
    

    return (
        <nav className="flex items-center justify-end w-[100%] px-[2rem] py-[0.5rem]">
            {
                token !== '' ? 
                <LogoutButton setToken={setToken}/> : ""
            }
        </nav>
    )
}

export default Navbar