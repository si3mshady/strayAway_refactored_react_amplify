import React from 'react'
import '../index.css';

export default function MiniDisplay({gps}) {
    return (
        <div className="miniDisplay">
                <div className="miniDisplay__container">
                    
                     <div className="miniDisplay__container--output">
                       
                     {gps.map((location, index) => 
                  
                  (
                    <>
                        <p key={index}>{location.longitude}</p>
                        <p key={index+1}>{location.latitude}</p>
                        <p key={index+2}>{location.accuracy}</p> 
                               
                    </> ))}

                    </div>
                </div> 
            </div>
    )
}
