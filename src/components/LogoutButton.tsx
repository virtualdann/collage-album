import React, {Dispatch, SetStateAction} from 'react'

import {useNavigate} from 'react-router-dom'

interface TokenProps {
    setToken: Dispatch<SetStateAction<string>>,
}

const LogoutButton : React.FC<TokenProps> = ({setToken}) => {
    
    const navigate = useNavigate()


    const logout = () => {
        setToken("")
        window.sessionStorage.removeItem("token")
        navigate('/')
    }

    return (
        <button onClick={logout}>Logout</button>    
    )
}

export default LogoutButton