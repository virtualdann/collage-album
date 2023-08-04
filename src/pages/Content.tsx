import Canvas from "../components/Canvas"
import {useEffect, useState} from 'react'
// import { getToken } from "../calls/apiCall"
import axios from "axios";
// import html2canvas from 'html2canvas';

import { toPng } from "html-to-image";

import { useRef } from "react";

import {Album} from '../components/index'

const Content = () => {

    const elementRef = useRef(null)

    const [token, setToken] = useState("")
    const [time, setTime] = useState("medium_term")
    const [tracks, setTracks] = useState<Album[]>([
        {
            artists: [{
                name: ""
            }],
            name : "",
            album : {
                images : [{
                    url : "",
                }]
            }
        }
    ])


    const getTracks = async (time_range : string, accessToken : string) => {

        try {
            const {data} = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    time_range: time_range,
                }
            })

            console.log(data.items);
            return data.items
        } catch (e) {
            console.error('Error:', (e as Error).message);
            return null
        }
    }

    const shuffle = (array: Album[]) => { 
        return array.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value); 
    }; 

    useEffect(() => {
        const tok = window.localStorage.getItem("token") || "";
        console.log(tok)
        setToken(tok)


    }, [])

    useEffect(() => {
        if ( token !== ""){ 
            getTracks(time, token)
            .then(response => setTracks(shuffle(response))) 
        }

        return (
            setTracks([
                {
                    artists: [{
                        name: ""
                    }],
                    name : "",
                    album : {
                        images : [{
                            url : "",
                        }]
                    }
                }
            ])
        )

    }, [time, token])

    // function convertDivToImage() {
    //     const divToCapture = document.getElementById('capture');
    //     const button = document.getElementById('download-btn');
        
    //     if (divToCapture && button) {

    //         html2canvas(divToCapture, {useCORS: true}).then(canvas => {
    //             // Convert canvas to image data URL
    //             const imageDataURL = canvas.toDataURL();
                
    //             // Create an image element and set its source to the data URL
    //             const img = new Image();
    //             img.src = imageDataURL;

    //             if (button instanceof HTMLAnchorElement) {
    //                 button.href = imageDataURL
    //                 button.download = 'image.png'
    //             }
                
    //             // Append the image to the document or use it as needed
    //             document.body.appendChild(img);
    //         });
    //     }
    //   }

    console.log(time)

    const htmlToImageConvert = () => {

        if (elementRef.current) {

            toPng(elementRef.current, { cacheBust: false, pixelRatio: 16/9 })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
        }
      };

    return (
        <div className="flex flex-col items-center justify-center my-[3rem] gap-[1em]">
            <div className="time-btn flex place-items-center gap-[1em]">
                <button 
                    onClick={() => setTime('short_term')} 
                    className={ time === "short_term" ? `text-black bg-[#1ED760] border-none` : ""}
                    style={{
                        fontSize: "10px"
                    }}
                
                >Last month</button>
                <button 
                    onClick={() => setTime('medium_term')} 
                    className={ time === "medium_term" ? `text-black bg-[#1ED760] border-none` : ""}
                    style={{
                        fontSize: "10px"
                    }}
                    >Last 6 months</button>
                <button 
                onClick={() => setTime('long_term')}
                className={ time === "long_term" ? `text-black bg-[#1ED760] border-none` : ""}
                style={{
                    fontSize: "10px"
                }}
                 >More than 6 months</button>
            </div>

            <div id="capture" ref={elementRef}>
                {/* TODO: Time options */}
                {/* <button></button> */}
                {   
                    tracks.length === 20 ? 
                    <Canvas tracks={tracks} /> 
                    : ""

                }
            </div>

            <button onClick={htmlToImageConvert} id="download-btn">Download Image</button>
        </div>
    )
}

export default Content