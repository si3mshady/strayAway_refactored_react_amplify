import React from 'react'
import '../index.css';
import $ from 'jquery'
import Axios from 'axios'
import MiniDisplay from '../components/MiniDisplay'

const initialLocationState = {
    latitude: null,
    longitude: null,
    speed:null,
    timestamp: null
  }

export default function ButtonContainer({imgRef}) {
    const [gps, setGPS] = React.useState([initialLocationState]) // uses an array of dictionaries 
    const [clicked, setButtonClicked ] = React.useState(false)
    const [gpsHistory, updateGPSHistory] =  React.useState([...gps]) // spread operator only works on iterables    
    const handleGeoLocation = (event) => {

        setGPS([{ latitude:event.coords.latitude,  longitude:event.coords.longitude,
          accuracy:event.coords.accuracy, timestamp: new Date().toISOString() }])  }


    const trackHistory = () => {
            updateGPSHistory(prev => ([ ...prev,...gps])) //create new array with new & previous elements
            console.log(gpsHistory)
          }

        
    

    React.useEffect(() => { navigator.geolocation.getCurrentPosition(handleGeoLocation)},[clicked])  // useEffect is triggered ONLY when selected pieces of state are updated 
  React.useEffect(() => {
    const url = "https://72zu52q14g.execute-api.us-east-1.amazonaws.com/dev/tracker"
    Axios.post(url, gpsHistory)
      .then(response => {
        console.log(response)
        console.log("updated gpsHistory")
      })
      .catch(error => {
        console.log(error)
        
      })

  }, [gps])

    const getImage = (event) => {
        $("#camera").on("change", (event) => {
            if (event.target.files[0] !== null) {                           
                imgRef.current.src = window.URL.createObjectURL(event.target.files[0]) 
                }  } ) }

    return (
        <>
        
        <div className="containerButtons"> 

            <div className="containerButtons__row">
            <div className="containerButtons__row--col">
                        <button onClick={() => ( $('input').click(), setButtonClicked(!clicked), trackHistory())}  className="theGlow" >
                            
                        <i class="fas fa-camera"></i>

                            <form  action="#" id="form" encType="multipart/form-data">
                                <input hidden  onClick={getImage}
                                type="file" id="camera" accept="image/*" capture />
                                </form>
                         
                        
                        </button>
                </div>   
           
            </div>            
            <MiniDisplay gps={gps} />
        </div>
        
    </>

    )
}


//https://reactjs.org/docs/hooks-reference.html#useref
//https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b

