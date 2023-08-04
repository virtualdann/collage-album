import { useEffect, useState } from 'react'
import '../index.css'
import { Square, randomInRange } from "./Canvas"

interface CardProps {
    square: Square,
    width: number,
    height: number,
    img : string,
    title : string,
    artist: string
}

const Card : React.FC<CardProps> = ({square, width, height, img, title, artist}) => {

    console.log(square.track)

    const [random, setRandom] = useState(0)

    useEffect(() => {
        setRandom(Math.floor(Math.random() * (80 - 30) + 30))
    }, [])

    return (

        <div 
            // className="bg-zinc-900 absolute drop-shadow-md flex flex-col items-center justify-around" 
            // className="bg-gradient-to-t from-[#520702] to-[#7a0901] absolute drop-shadow-md flex flex-col items-center justify-around" 
            className="bg-gradient-to-t from-[#1c1c1c] to-[#353635] absolute drop-shadow-md flex flex-col items-center justify-around" 
            style={{
                width: `${width}px`, 
                height: `${height}px`, 
                left: `${square.x}px`, 
                top: `${square.y}px`, 
                rotate: Math.random() < 0.5 ? `${(Math.floor(Math.random()*randomInRange(-15, 15)))}deg` : Math.random() < 0.1 ? `${(Math.floor(Math.random()*randomInRange(-30, 30)))}deg` : '0',
                scale: `${(Math.random() * 0.5) + 1}`,
                zIndex: `${randomInRange(10,55)}`
            }}
            >
            

            {square.track && <img className="w-[90%] aspect-square bg-white rounded-sm object-cover" src={img} alt='album_cover' />}

            <div id="bottom-card" className="w-[90%] grid gap-[0.2em]">

                <div id="song-desc" className="flex justify-between items-center w-[100%]">
                    <div className="w-[80%]">
                        <div className="text-[5px] font-medium overflow-hidden h-[7px] w-[100%]">{title}</div>
                        <div className="text-[4px] text-slate-300">{artist}</div>
                    </div>
                    
                    {/* <span className="material-symbols-outlined object-contain text-[8px] text-[#1ED760]">favorite</span> */}
                    {
                        Math.random() > 0.3 ?
                        <img src='/fav-fill.svg' alt='favourite button card' className='aspect-square w-[8px]'/>
                        :
                        <img src='/fav-no-fill.svg' alt='favourite button card' className='aspect-square w-[8px]'/>

                    }
                </div>

                <div id="play-line" className="relative">
                    <div id="secondary-line" className="w-[100%] h-[0.5px] bg-slate-500 absolute z-0"></div>
                    <div id="main-line" 
                        className={`h-[0.5px] bg-white absolute z-2`}
                        style={{width: `${random}%`}}
                        ></div>
                    <div id="main-line-circle" 
                        className={`-translate-y-[0.99px] h-[3px] aspect-square rounded-[50%] bg-white absolute z-3`}
                        style={{left: `${random}%`}}
                        ></div>
                </div>

                <div id="play-control" className="flex justify-center items-center mt-[4px]">
                    {/* <p className="text-[5px]">&larr;</p> */}
                    {/* <p className="text-[7px]">P</p> */}
                    {/* <p className="text-[5px]">&rarr;</p> */}
                    {/* <span className="material-symbols-outlined text-[15px]">skip_previous</span>
                    <span className="material-symbols-outlined">play_circle</span>
                    <span className="material-symbols-outlined text-[15px]">skip_next</span> */}
                    <img src='/skip-prev.svg' alt='skip previous button card' className='aspect-square w-[20px]'/>
                    {
                        Math.random() > 0.5 ?
                        <img src='/play-btn.svg' alt='play button card' className='aspect-square w-[25px]' />
                        :
                        <img src='/pause-btn.svg' alt='pause button card' className='aspect-square w-[25px]' />

                    }
                    <img src='/skip-next.svg' alt='skip next button card' className='aspect-square w-[20px]' />

                </div>

            </div>


        </div>
    )
}

export default Card