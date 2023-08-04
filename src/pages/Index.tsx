import { Link } from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'

const Index = () => {

    const CLIENT_ID = 'b43106e895fe43fab2f473a1fac47dc3'
    // const CLIENT_SECRET = '3d92334306884ea291a919cc332c9130'
    const REDIRECT_URI = 'https://spotify-album-coll.onrender.com/'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'
    const SCOPE = 'user-top-read'

    const [token, setToken] = useState('')

    const navigate = useNavigate()

    const getToken = () => {
        let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
        const token = urlParams.get('access_token');
        return token
    }

    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
        token = getToken()

        window.location.hash = ""
        window.localStorage.setItem("token", token ? token : "")
      }

      setToken(token ? token : '')
    
    }, [])

    useEffect(() => {
        if (token !== '') {
            navigate('/content')
        }

    }, [token])
    

    return (
        <main className='flex flex-col place-items-center gap-[3rem]'>
            <header>
                <h1 className="">Generate your Spotify album collage</h1>
            </header>
            {
                token !== '' ? 
                <LogoutButton setToken={setToken}/>
                :
                <Link to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`} className='text-[#1ED760]'>Login to Spotify</Link>
            }
        </main>
    )
}

export default Index