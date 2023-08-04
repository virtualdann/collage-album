import { useState, useEffect } from 'react'
import Card from './Card'

import {Album} from '../components/index'

// const isInRange = (number: number, lowerBound: number, upperBound: number) => {
//     return number <= upperBound && number >= lowerBound
// }

// import {PagingObject, TrackObjectFull} from './index'

export interface Square {
    x: number,
    y: number,
    track: Album
}

interface TracksProp {
    tracks: Album[]
}

export const randomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const Canvas : React.FC<TracksProp> = ({tracks}) => {
    
    const [squares, setSquares] = useState<Square[]>()

    
    const square_width = 90
    const square_height = 160
    
    // Usage 

    const generateSquares = (outerLayer: number) => {


        const shapes: Square[] = [];
        
        for (let i = 1; i <= outerLayer; i++) {
            let ranX, ranY
            
            // const layer: Square[] = [];

            for (let j = 1; j <= 5; j++) {
        
                if (j == 1) {
                    shapes.push({ x: -10 + randomInRange(-10, 10), y: (i-1) * square_height, track: tracks[i*j]});
                    continue;
                }

                ranX = (j-1) * square_width - 50 + randomInRange(0, 10);
                // ranY = i * square_height + 20 + randomInRange(-80, 100);
                // ranX = j * square_width ;
                ranY = (i-1) * square_height - 80 + randomInRange(0, 10);

                shapes.push({ x: ranX, y: ranY, track: tracks[i*j]});
            }
        } 

        return shapes;
      };
      
      

    useEffect(() => {
        setSquares(generateSquares(4))
    }, [])

    return (
        <div className='h-[560px] w-[330px] bg-slate-700 relative overflow-hidden'>
            {   
                squares === undefined ? "" :

                squares.map((square, index) => {
                    let track = tracks[index]

                    // do {
                    //     track = tracks[index]
                    // } while (track === undefined)

                    // console.log(track)

                    return (
                        <Card 
                        key={index} 
                        square={square} 
                        width={square_width} 
                        height={square_height}
                        img={track.album.images[0].url} 
                        title={track.name} 
                        artist={track.artists[0].name}
                        
                            />
                    )
                })
            }
        </div>
    )
}

export default Canvas