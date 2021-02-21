
import React from 'react'
import '../index.css';

export default function MiniDisplay({gps,labels, reverseGeoLocation}) {
    
 
    return (
        <div className="miniDisplay">
                <div className="miniDisplay__container card">
                    
                     <div className="miniDisplay__container--output ">
                     <div className="miniDisplay__container--output--front">
                     
                                {gps.map((location, index) => 
                            
                            (
                                <>
                                    <p key={index}>{`Longitude: ${location.longitude !== null? location.longitude: ""}`}</p>                                    
                                    <p key={index+1}>{`Latitude: ${location.latitude !== null? location.latitude: ""}`}</p>
                                           {console.log(reverseGeoLocation, "BINGO!")}
                                   
                                        
                                </> ))}
                                <p >{`City: ${reverseGeoLocation.city !== null? reverseGeoLocation.city : ""}`}</p> 
                                    <p >{`State: ${reverseGeoLocation.state !== null? reverseGeoLocation.state : ""}`}</p> 
                                    <p >{`Zip: ${reverseGeoLocation.zipcode  !== null? reverseGeoLocation.zipcode : ""}`}</p> 
                     </div>

                     <div className="miniDisplay__container--output--back">
                    
                     {labels.map((label, index) => 
                            
                            (
                                <>
                                    <p key={index}>{`${label.Name}: ${label.Confidence}`}</p>
                                   
                                </> ))}
                     </div>
                    

                    </div>

                    
                </div> 
            </div>
    )
}
