import React from 'react'
import '../index.css';

export default function MiniDisplay({gps}) {
    return (
        <div className="miniDisplay">
                <div className="miniDisplay__container card">
                    
                     <div className="miniDisplay__container--output ">
                       
                     {gps.map((location, index) => 
                  
                  (
                    <>
                        <p key={index}>{`Longitude: ${location.longitude !== null? location.longitude: ""}`}</p>
                        <p key={index+1}>{`Latitude: ${location.latitude !== null? location.latitude: ""}`}</p>
                        <p key={index+2}>{`Accuracy: ${location.accuracy !== null? location.accuracy: ""}%`}</p> 
                               
                    </> ))}

                    </div>
                </div> 
            </div>
    )
}
