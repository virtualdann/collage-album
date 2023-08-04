import axios from "axios";

export const getToken = async () => {
    const clientId = 'b43106e895fe43fab2f473a1fac47dc3';
    const clientSecret = '3d92334306884ea291a919cc332c9130';

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        }),
        });

        if (!response.ok) {
        throw new Error('Failed to get token');
        }

        const data = await response.json();
        const accessToken = data.access_token;
        console.log('Access Token:', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error:', (error as Error).message);
        return null;
    }
    };

export const getTracks = async (time_range : string, limit : number, accessToken : string) => {

    try {
        const data = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                time_range: time_range,
                limit: limit,
            }
        })

        if (!data) {
            throw new Error('Failed to get data');
        }
    
        // const data = await response.json();
        console.log('Data:', data);
        return data
    } catch (e) {
        console.error('Error:', (e as Error).message);
        return null
    }
}